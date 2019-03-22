import React, { Component } from 'react'
import { connect } from 'react-redux'

import Selector from './Selector.component'

import { select, defaultSelector } from './Selector.duck'

class SelectorContainer extends Component {
  update = values => {
    console.log(values)
  }

  toggleCheckbox = () => {
    const { title, currentSelector } = this.props
    this.props.select(title, { checked: !currentSelector.checked })
  }

  handleButtonClick = (e) => {
    const { title } = this.props
    this.props.select(title, { buttonValue: e.target.textContent })
  }

  render() {
    const { selectOptions = [] } = this.props

    const options = selectOptions.length
      ? selectOptions.map(v => ({ key: v, text: v, value: v }))
      : selectOptions

    return (
      <Selector
        {...this.props}
        {...this.props.currentSelector}
        options={options}
        toggleCheckbox={this.toggleCheckbox}
        sliderUpdate={this.update}
        onButtonClick={this.handleButtonClick}
      />
    )
  }
}

const mapState = (state, props) => {
  return {
    currentSelector: state.userSelect.selected[props.title] || defaultSelector,
  }
}

export default connect(
  mapState,
  { select }
)(SelectorContainer)
