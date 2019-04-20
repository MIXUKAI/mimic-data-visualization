import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Image, Segment } from 'semantic-ui-react'
import { Pie } from 'react-chartjs-2'

import withCurrentView from '../../hoc/withCurrentView'
import { getColors } from '../../util/colors';

class Explore extends Component {
  animation = 'push'

  state = {
    visible: true,
  }

  formatDemographicData = (source = [], type) => {
    const result = { labels: [], datasets: [] }
    if (source.length) {
      result.labels = source.map(pa => pa[type])
      result.datasets.push({
        data: source.map(pa => pa.count),
        backgroundColor: getColors(source.length)
      })
    }
    return result
  }

  render() {
    console.log(this.props.demographic)
    const { religion, gender, ethnicity, marital } = this.props.demographic
    const religionData = this.formatDemographicData(religion, 'religion')
    const genderData = this.formatDemographicData(gender, 'gender')
    const ethnicityData = this.formatDemographicData(ethnicity, 'ethnicity')
    const maritalData = this.formatDemographicData(marital, 'marital_status')

    return (
      <div>
        <Segment basic>
          {religion.length ? <Pie
            height={100}
            data={religionData}
          /> : null}
          {gender.length ? <Pie
            height={100}
            data={genderData}
          /> : null}
          {ethnicity.length ? <Pie
            height={100}
            data={ethnicityData}
          /> : null}
          {marital.length ? <Pie
            height={100}
            data={maritalData}
          /> : null}
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Segment>
      </div>
    )
  }
}

const mapState = (state) => ({
  demographic: state.explore.demographic,
})

export default connect(mapState)(withCurrentView(Explore))
