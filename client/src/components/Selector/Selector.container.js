import React, { Component } from 'react'
import { connect } from 'react-redux'

import Selector from './Selector.component'

import { select, defaultSelector } from './Selector.duck'

class SelectorContainer extends Component {
  updateState = (k, v) => {
    const { title } = this.props
    this.props.select(title, { [k]: v })
  }

  toggleCheckbox = () => {
    const { currentSelector } = this.props
    this.updateState('checked', !currentSelector.checked)
  }

  handleButtonClick = e => {
    this.updateState('buttonValue', e.target.textContent)
  }

  handleOptionChange = e => {
    this.updateState('optionValue', e.target.textContent)
  }

  handleSliderChange = values => {
    this.updateState('sliderValue', values)
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
        onOptionChange={this.handleOptionChange}
        onSliderChange={this.handleSliderChange}
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
