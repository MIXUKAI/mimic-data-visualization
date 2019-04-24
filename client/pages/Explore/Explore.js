import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Responsive, Grid } from 'semantic-ui-react'
import { Pie, Bar } from 'react-chartjs-2'

import withCurrentView from '../../hoc/withCurrentView'
import { getColors } from '../../util/colors'
import Modal from '../../components/Modal/Modal.component'
import { setModalOpen } from '../../components/Chart/Chart.duck'
import Group from './Group'
import Instruction from './Instrction'
import './Explore.css'

class Explore extends Component {
  animation = 'push'

  state = {
    visible: true,
  }

  formatDemographicData = (
    source = [],
    type,
    title,
    group,
    chartType = 'Pie'
  ) => {
    const result = { labels: [], datasets: [], title, chartType }
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
      group && group.push(result)
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
    const demographic = []
    const ageData = {
      labels: [],
      datasets: [],
      title: '年龄分布',
      chartType: 'Bar',
    }
    ageData.labels = age.length
      ? Object.keys(age[0]).filter(key => key !== 'count')
      : []
    age.length &&
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
    age.length && demographic.push(ageData)
    this.formatDemographicData(religion, 'religion', '宗教信仰', demographic)
    this.formatDemographicData(gender, 'gender', '性别分布', demographic)
    this.formatDemographicData(ethnicity, 'ethnicity', '种族分布', demographic)
    this.formatDemographicData(
      marital,
      'marital_status',
      '婚姻状况',
      demographic
    )

    const administrative = []
    this.formatDemographicData(
      icutype,
      'first_careunit',
      '重症监护室类型',
      administrative,
      'Bar'
    )
    this.formatDemographicData(
      admissionLocation,
      'admission_location',
      '入住地点',
      administrative
    )
    this.formatDemographicData(
      admissionType,
      'admission_type',
      '入住类型',
      administrative
    )
    this.formatDemographicData(
      insurance,
      'insurance',
      '保险类型',
      administrative
    )

    let ModalChart = Pie
    if (modal.type === 'Bar') {
      ModalChart = Bar
    }

    return (
      <div style={{ padding: '0 80px' }}>
        <Instruction />
        <Modal
          isOpen={modal.open}
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
          <Group
            title={{
              ctitle: '人口统计信息',
              etitle: 'Demographic Information',
              icon: 'users',
            }}
            data={demographic}
          />
          <Group
            title={{
              ctitle: '行政管理信息',
              etitle: 'Administrative Information',
              icon: 'ambulance',
            }}
            data={administrative}
          />
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
