import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Navigator from '../../components/Navigator/Navigator.component'

import withCurrentView from '../../hoc/withCurrentView'

class Compare extends Component {
  render() {
    return (
      <div>
        <Navigator />
        <h2>Compare</h2>
        hello Compare
      </div>
    )
  }
}

export default withCurrentView(Compare)
