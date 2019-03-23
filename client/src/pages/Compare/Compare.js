import React, { Component } from 'react'

import withCurrentView from '../../hoc/withCurrentView'

class Compare extends Component {
  render() {
    return (
      <div>
        <h2>Compare</h2>
        hello Compare
      </div>
    )
  }
}

export default withCurrentView(Compare)
