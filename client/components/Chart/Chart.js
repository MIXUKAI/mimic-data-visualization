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
      this.props.setModalOpen({ data: { ...data, type }, type, open: true })
    }
    const newData = type !== 'Bar' ? {
      ...data,
      labels: data.labels
        .filter(l => !!l)
        .slice(0, 10)
        .map(l => {
          if (l.length > 10) {
            return l.slice(0, 10) + '...'
          }
          return l
        }),
    } : data

    return data.datasets.length ? (
      <Grid.Column>
        <C
          onElementsClick={this.onElementsClick}
          data={newData}
          options={{
            title: {
              display: true,
              text: data.title,
              fontSize: 15,
              lineHeight: 2,
              fontColor: '#1678c2',
              position: type === 'Bar' ? 'top' : 'left',
            },
            legend: {
              position: 'right',
              display: type !== 'Bar',
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
