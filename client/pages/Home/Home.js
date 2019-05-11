import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from './Head.component'
import { Container } from 'semantic-ui-react'

import { getColors } from '../../util/colors'
import withCurrentView from '../../hoc/withCurrentView'
import './Home.css'
class Home extends Component {
  render() {
    const { admission } = this.props

    const admissionData = { labels: [], datasets: [] }
    admissionData.labels = admission.map(ad => ad.admission_type)
    admissionData.datasets.push({
      data: admission.map(ad => ad.count),
      backgroundColor: getColors(),
    })
    return (
      <div style={{ backgroundColor: '#f9f9f9' }}>
        <Head />
        <Container className="home-container">
          <h2 className="home-container-h2">Welcome!</h2>
          <p className="home-container-p">
            MIMIC II可视化工具是一个基于Web的工具，允许用户探索和比较MIMIC
            II数据库中的一些基本趋势。该工具中提供的信息并非旨在提供数据库的每个细节，而是允许一个人选择的队列中的数据快照。它的设计适用于可能对医疗保健大数据感兴趣的任何用户。但是，该工具专为可能对MIMIC
            II数据库所包含的基本信息可视化感兴趣的研究人员或医生设计。可在相应页面上找到更多信息和说明。
          </p>
          <p className="home-container-p">
            该工具本身基于Linux，Apache，Postgres，Node堆栈变体，它从服务器端后端提取数据以返回可视结果。有关这方面的更多信息，您可以查看该工具的工作原理细分。
          </p>
        </Container>
        <Container className="home-container">
          <h2 className="home-container-h2">About MIMIC III</h2>
          <p className="home-container-p">
            MIMIC是一个由麻省理工学院计算生理学实验室开发的开源数据集，它重症监护医学研究的重要数据支撑和临床科研工具，也是病人生命体征监测设备数据分析改进的重要数据源，它提供的数据集跨越十多年。其中包括了约40,000名重症监护患者相关的经鉴定的健康数据。
            它还涵盖人口统计，生命体征，实验室测试，药物等信息。
          </p>
          <p className="home-container-p">
            更多关系MIMIC的信息请访问MIMIC-III的官方网站: <a href="https://mimic.physionet.org/">https://mimic.physionet.org/</a>
          </p>
        </Container>
      </div>
    )
  }
}

const mapState = state => {
  const { admission } = state.homeOverview
  return {
    admission,
  }
}

export default connect(mapState)(withCurrentView(Home))
