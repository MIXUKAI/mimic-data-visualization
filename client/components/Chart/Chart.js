import React from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Pie, Bar } from 'react-chartjs-2'

import { toggleModal, setModalOpen } from '../../components/Chart/Chart.duck'
import './Chart.css'

class Chart extends React.Component {
  render() {
    const { data, type } = this.props
    let C = Pie
    if (type === 'Bar') {
      C = Bar
    }

    this.onElementsClick = () => {
      const { data, type } = this.props
      this.props.setModalOpen({ data, type, open: true })
    }
    const newData = { ...data, labels: data.labels.slice(0, 10) }

    return data.datasets.length ? (
      <Grid.Column>
        <C
          onElementsClick={this.onElementsClick}
          data={newData}
          options={{
            title: {
              display: true,
              text: data.title,
              position: type === 'Bar' ? 'top' : 'left',
            },
            legend: {
              position: 'right',
              display: type !== 'Bar'
            },
          }}
        />
      </Grid.Column>
    ) : null
  }
}

export default connect(
  null,
  { toggleModal, setModalOpen }
)(Chart)
