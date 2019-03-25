import React, { Component } from 'react'

import { store } from '../App'
import { setView } from '../components/Navigator/Navigator.duck'

export default function withCurrentView(WrappedComponent) {
  return class WithCurrentView extends Component {
    componentDidMount() {
      store.dispatch(setView(WrappedComponent.name))
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
