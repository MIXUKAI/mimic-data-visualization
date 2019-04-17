import React, { Component } from 'react'
import { connect } from 'react-redux'

import Selector from './Selector.component'

import { select, defaultSelector } from './Selector.duck'

class SelectorContainer extends Component {
  updateState = (k, v, type = 'button') => {
    const { name } = this.props
    this.props.select(name, { [k]: v, type })
  }

  toggleCheckbox = () => {
    const { currentSelector } = this.props
    this.updateState('checked', !currentSelector.checked)
  }

  handleButtonClick = (e) => {
    this.updateState('buttonValue', e.target.textContent, 'button')
  }

  handleOptionChange = (e) => {
    this.updateState('optionValue', e.target.textContent, 'option')
  }

  handleSliderChange = (values) => {
    this.updateState('sliderValue', values, 'slider')
  }

  render() {
    const { options = [] } = this.props

    const formatedOptions = options.length
      ? options.map(v => ({ key: v, text: v, value: v }))
      : []

    return (
      <Selector
        {...this.props}
        {...this.props.currentSelector}
        options={formatedOptions}
        toggleCheckbox={this.toggleCheckbox}
        onButtonClick={this.handleButtonClick}
        onOptionChange={this.handleOptionChange}
        onSliderChange={this.handleSliderChange}
      />
    )
  }
}

const mapState = (state, props) => {
  return {
    currentSelector: state.userSelect.selected[props.name] || defaultSelector,
  }
}

export default connect(
  mapState,
  { select }
)(SelectorContainer)
