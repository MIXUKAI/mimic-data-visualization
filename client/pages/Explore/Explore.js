import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Header,
  Image,
  Segment,
  Grid,
  Container,
  Button,
  Icon,
} from 'semantic-ui-react'
import { Pie, Bar } from 'react-chartjs-2'

import withCurrentView from '../../hoc/withCurrentView'
import { getColors } from '../../util/colors'
import Modal from '../../components/Modal/Modal.component'
import MyChart from '../../components/Chart/Chart'
import { setModalOpen } from '../../components/Chart/Chart.duck'
import './Explore.css'

class Explore extends Component {
  animation = 'push'

  state = {
    visible: true,
  }

  formatDemographicData = (source = [], type, title) => {
    const result = { labels: [], datasets: [], title }
    source.sort((a, b) => b.count - a.count)
    const count = source.reduce((prev, curr) => prev + +curr.count, 0)
    if (source.length) {
      result.labels = source.map(
        pa => `${((pa.count / count) * 100).toFixed(2)}% ${pa[type]}`
      )
      result.datasets.push({
        data: source.map(pa => pa.count),
        backgroundColor: getColors(source.length),
      })
    }
    return result
  }

  render() {
    console.log(this.props.demoGraphicHistory)
    const { modal } = this.props
    const {
      religion,
      gender,
      ethnicity,
      marital,
      age,
      icutype = [],
      insurance = [],
      admissionType = [],
      admissionLocation = [],
    } = this.props.demographic
    const ageData = { labels: [], datasets: [] }
    ageData.labels = age.length
      ? Object.keys(age[0]).filter(key => key !== 'count')
      : []
    ageData.datasets.push({
      data: age.length
        ? Object.keys(age[0])
            .filter(k => k !== 'count')
            .map(k => age[0][k])
        : [],
      backgroundColor: getColors(
        age.length ? Object.keys(age[0]).filter(k => k !== 'count').length : 0
      ),
    })
    console.log(ageData)
    const religionData = this.formatDemographicData(
      religion,
      'religion',
      '宗教信仰'
    )
    const genderData = this.formatDemographicData(gender, 'gender', '性别分布')
    const ethnicityData = this.formatDemographicData(
      ethnicity,
      'ethnicity',
      '种族分布'
    )
    const maritalData = this.formatDemographicData(
      marital,
      'marital_status',
      '婚姻状况'
    )
    const icutypeData = this.formatDemographicData(
      icutype,
      'first_careunit',
      '重症监护室类型'
    )
    const adLocationData = this.formatDemographicData(
      admissionLocation,
      'admission_location',
      '入住地点'
    )
    const adTypeData = this.formatDemographicData(
      admissionType,
      'admission_type',
      '入住类型'
    )
    const insuranceData = this.formatDemographicData(
      insurance,
      'insurance',
      '保险类型'
    )

    let ModalChart = Pie
    if (modal.type === 'Bar') {
      ModalChart = Bar
    }

    console.log(this.props.demo)
    return (
      <div style={{ padding: '0 80px' }}>
        <Modal
          isOpen={modal.open}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
          <button onClick={() => this.props.setModalOpen({ open: false })}>
            close
          </button>
          {modal.data.datasets.length ? (
            <ModalChart
              height={100}
              data={modal.data}
              options={{
                legend: {
                  position: 'right',
                },
              }}
            />
          ) : null}
          >
        </Modal>

        <Grid style={{ margin: '50px 0' }}>
          <Header as="h2">
            <Icon name="users" />
            <Header.Content>
              Demographic Information
              <Header.Subheader>人口统计信息</Header.Subheader>
            </Header.Content>
          </Header>
          <Grid.Row columns={3}>
            <MyChart onElementsClick={this.openModal} data={religionData} />
            <MyChart data={genderData} />
            <MyChart data={ethnicityData} />
            <MyChart data={maritalData} />
            <MyChart data={ageData} type="Bar" />
          </Grid.Row>
          <Header size="medium">Administrative Information</Header>
          <Grid.Row columns={3}>
            <MyChart data={insuranceData} />
            <MyChart data={adLocationData} />
            <MyChart data={adTypeData} />
            <MyChart data={icutypeData} type="Bar" />
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapState = state => ({
  demographic: state.explore.demographic.present,
  demoGraphicHistory: state.explore.demographic,
  modal: state.chart.modal,
})

export default connect(
  mapState,
  { setModalOpen }
)(withCurrentView(Explore))
