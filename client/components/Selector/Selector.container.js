import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import { connect } from 'react-redux'

import Selector from './Selector.component'

import { select, defaultSelector } from './Selector.duck'

class SelectorContainer extends Component {
  constructor(props) {
    super(props)
    this.debouncedUpdate = debounce(this.updateState, 1000).bind(this)
  }

  updateState = (k, v, type = 'button', cb) => {
    const { name } = this.props
    this.props.select(name, { [k]: v, type })
    cb && cb(v)
  }

  toggleCheckbox = () => {
    const { currentSelector } = this.props
    this.updateState('checked', !currentSelector.checked)
  }

  handleButtonClick = e => {
    const { currentSelector } = this.props
    const textContent = e.target.textContent
    const newValue =  [...currentSelector.buttonValue]
    const index = currentSelector.buttonValue.indexOf(textContent)
    if (index === -1) {
      newValue.push(textContent)
    } else {
      newValue.splice(index, 1)
    }
    this.updateState('buttonValue', newValue, 'button')
  }

  handleOptionChange = e => {
    this.updateState('optionValue', e.target.textContent, 'option')
  }

  handleSliderChange = values => {
    this.updateState('sliderValue', values, 'slider')
  }

  handleInputChange = e => {
    this.debouncedUpdate('inputValue', e.target.value, 'input', value => {
      this.props.onInputChanged && this.props.onInputChanged(value)
    })
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
        onInputChange={this.handleInputChange}
      />
    )
  }
}

const mapState = (state, props) => {
  return {
    currentSelector: state.userSelect[props.name] || defaultSelector,
    icdSearched: state.explore.icdSearched,
  }
}

export default connect(
  mapState,
  { select }
)(SelectorContainer)
