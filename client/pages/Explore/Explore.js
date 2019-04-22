import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Image, Segment, Grid, Container, Button } from 'semantic-ui-react'
import { Pie, Bar } from 'react-chartjs-2'

import withCurrentView from '../../hoc/withCurrentView'
import { getColors } from '../../util/colors'
import Modal from '../../components/Modal/Modal.component'
import './Explore.css'

class Explore extends Component {
  animation = 'push'

  state = {
    visible: true,
    modalIsOpen: false,
  }

  formatDemographicData = (source = [], type) => {
    const result = { labels: [], datasets: [] }
    if (source.length) {
      result.labels = source.map(pa => pa[type])
      result.datasets.push({
        data: source.map(pa => pa.count),
        backgroundColor: getColors(source.length),
      })
    }
    return result
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  render() {
    console.log(this.props.demographic)
    const { religion, gender, ethnicity, marital, age } = this.props.demographic
    console.log(age)
    const ageData = { labels: [], datasets: [] }
    ageData.labels = age.length ? Object.keys(age[0]).filter(key => key !== 'count') : []
    ageData.datasets.push({
      data: age.length ? Object.keys(age[0]).filter(k => k !== 'count').map(k => age[0][k]) : [],
      backgroundColor: getColors(age.length ? Object.keys(age[0]).filter(k  => k !== 'count').length : 0)
    })
    console.log(ageData)
    // const ageData = Object.keys(age[0]).filter(key => key !== 'count').map(key => ({}))
    const religionData = this.formatDemographicData(religion, 'religion')
    const genderData = this.formatDemographicData(gender, 'gender')
    const ethnicityData = this.formatDemographicData(ethnicity, 'ethnicity')
    const maritalData = this.formatDemographicData(marital, 'marital_status')

    return (
      <div>
        {/* <Segment basic> */}
        <Button onClick={this.openModal}>open modal</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          {ethnicity.length ? (
            <Pie
              height={100}
              data={ethnicityData}
              options={{
                legend: {
                  position: 'right',
                }
              }}
            />
          ) : null}>
        </Modal>

        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              {religion.length ? (
                <Pie
                  // height={100}
                  onElementsClick={this.openModal}
                  data={religionData}
                  options={{
                    title: {
                      display: true,
                      text: 'dsdsd',
                      position: 'left',
                    },
                    legend: {
                      position: 'right',
                      display: false,
                    }
                  }}
                />
              ) : null}
            </Grid.Column>
            <Grid.Column>
              {gender.length ? (
                <Pie
                  // height={100}
                  data={genderData}
                  options={{
                    legend: {
                      position: 'right',
                      display: false,
                    }
                  }}
                />
              ) : null}
            </Grid.Column>
            <Grid.Column>
              {ethnicity.length ? (
                <Pie
                  // height={100}
                  data={ethnicityData}
                  options={{
                    legend: {
                      position: 'right',
                      display: false,
                    }
                  }}
                />
              ) : null}
            </Grid.Column>
            <Grid.Column>
              {marital.length ? (
                <Pie
                  // height={100}
                  data={maritalData}
                  options={{
                    legend: {
                      position: 'right',
                      display: false,
                    }
                  }}
                />
              ) : null}
            </Grid.Column>
            <Grid.Column>
              {
                age.length ? (
                  <Bar
                    // height={100}
                    data={ageData}
                  />
                ) : null
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* </Segment> */}
      </div>
    )
  }
}

const mapState = state => ({
  demographic: state.explore.demographic,
})

export default connect(mapState)(withCurrentView(Explore))
