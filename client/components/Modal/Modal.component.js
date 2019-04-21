import React, { Component } from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#modal')

class Modal extends Component {

  render() {
    const { currentChart, ...otherProps } = this.props
    return (
      <ReactModal {...otherProps} /> 
    )
  }
}

export default Modal