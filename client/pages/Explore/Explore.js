import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Header, Icon } from 'semantic-ui-react'
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

  handleBarData = (sourceData, title, group) => {
    const result = {
      labels: [],
      datasets: [],
      title,
      chartType: 'Bar',
    }
    result.labels = sourceData.length
      ? Object.keys(sourceData[0]).filter(key => key !== 'count')
      : []
    sourceData.length &&
      Object.keys(sourceData[0]).some(k => +sourceData[0][k] > 0) &&
      result.datasets.push({
        data: sourceData.length
          ? Object.keys(sourceData[0])
              .filter(k => k !== 'count')
              .map(k => sourceData[0][k])
          : [],
        backgroundColor: getColors(
          sourceData.length
            ? Object.keys(sourceData[0]).filter(k => k !== 'count').length
            : 0
        ),
      })
    sourceData.length && group.push(result)
  }

  render() {
    console.log(this.props.demoGraphicHistory)
    const { modal } = this.props
    const {
      patientsCount = [],
      show_religion = [],
      show_gender = [],
      show_ethnicity = [],
      show_marital = [],
      show_age = [],
      show_icuType = [],
      show_insurance = [],
      show_admissionType = [],
      show_admissionSource = [],
      hos_los = [],
      icu_los = [],
      heartRate = [],
      temperature = [],
      artericalBloodPressure = [],
      pespiratoryRate = [],
      height = [],
      weightKg = [],
    } = this.props.demographic
    const pcount = patientsCount.length ? parseInt(patientsCount[0].patients_count)  : 0
    const demographic = []
    this.handleBarData(show_age, '年龄分布', demographic)
    this.formatDemographicData(
      show_religion,
      'religion',
      '宗教信仰',
      demographic
    )
    this.formatDemographicData(show_gender, 'gender', '性别分布', demographic)
    this.formatDemographicData(
      show_ethnicity,
      'ethnicity',
      '种族分布',
      demographic
    )
    this.formatDemographicData(
      show_marital,
      'marital_status',
      '婚姻状况',
      demographic
    )

    const administrative = []
    this.formatDemographicData(
      show_icuType,
      'first_careunit',
      '重症监护室类型',
      administrative,
      'Bar'
    )
    this.formatDemographicData(
      show_admissionSource,
      'admission_location',
      '入住地点',
      administrative
    )
    this.formatDemographicData(
      show_admissionType,
      'admission_type',
      '入住类型',
      administrative
    )
    this.formatDemographicData(
      show_insurance,
      'insurance',
      '保险类型',
      administrative
    )

    const patientOutcomes = []
    this.handleBarData(hos_los, '患者医院所呆时长', patientOutcomes)
    this.handleBarData(icu_los, '患者重症监护室所呆时长', patientOutcomes)
    const vitalSigns = []
    this.handleBarData(heartRate, '心率', vitalSigns)
    this.handleBarData(temperature, '体温', vitalSigns)
    this.handleBarData(artericalBloodPressure, '血压', vitalSigns)
    this.handleBarData(pespiratoryRate, '呼吸频率', vitalSigns)
    const miscellaneous = []
    this.handleBarData(height, '身高(cm)', miscellaneous)
    this.handleBarData(weightKg, '体重(kg)', miscellaneous)

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
          className="Modal"
          overlayClassName="Overlay"
        >
          <Button
            onClick={() => this.props.setModalOpen({ open: false })}
            primary
          >
            close
          </Button>
          {modal.data.datasets.length ? (
            <ModalChart
              height={100}
              data={modal.data}
              options={{
                legend: {
                  position: 'right',
                  display: modal.data.type !== 'Bar',
                },
                title: {
                  display: true,
                  text: modal.data.title,
                  fontSize: 30,
                  fontColor: '#666',
                  position: modal.data.type === 'Bar' ? 'top' : 'left',
                },
              }}
            />
          ) : null}
          >
        </Modal>

        {show_gender.length ? (
          <div className="icu-stay-info">
            <Header as="h2">
              <Icon name="user" />
              <Header.Content>
                ICU Stay Information
                <Header.Subheader>重症监护室居住的信息</Header.Subheader>
              </Header.Content>
            </Header>
            <p>
              icu总共有
              {show_gender.reduce(
                (p, c) => {
                  return parseInt(p.count) + parseInt(c.count)
                }
              )}
              个居住
            </p>
            <p>总共有{pcount}个患者</p>
          </div>
        ) : null}
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
          <Group
            title={{
              ctitle: '病人出入',
              etitle: 'Patient Outcomes',
              icon: 'hospital outline',
            }}
            data={patientOutcomes}
          />
          <Group
            title={{
              ctitle: '生命体征',
              etitle: 'Vital Signs',
              icon: 'heartbeat',
            }}
            data={vitalSigns}
          />
          <Group
            title={{
              ctitle: '杂',
              etitle: 'Miscellaneous',
              icon: 'medkit',
            }}
            data={miscellaneous}
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
