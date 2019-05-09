import React, { Component } from 'react'
import { connect } from 'react-redux'

import Selector from './Selector.component'

import {
  setButtons,
  setInput,
  setOptions,
  setSlider,
  setToggle,
} from './Selector.duck'

class SelectorContainer extends Component {
  handleToggle = () => {
    const { selected, name } = this.props
    this.props.setToggle(name, !selected.checked)
  }

  handleButtonClick = e => {
    const { selected, name } = this.props
    const textContent = e.target.textContent
    const newValue = [...selected.buttonValue]
    const index = selected.buttonValue.indexOf(textContent)
    if (index === -1) {
      newValue.push(textContent)
    } else {
      newValue.splice(index, 1)
    }
    this.props.setButtons(name, newValue)
  }

  handleOptionChange = e => {
    const { name } = this.props
    this.props.setOptions(name, e.target.textContent)
  }

  handleSliderChange = values => {
    const { name } = this.props
    this.props.setSlider(name, values)
  }

  render() {
    const { options = [] } = this.props

    const formatedOptions = options.length
      ? options.map(v => ({ key: v, text: v, value: v }))
      : []

    return (
      <Selector
        {...this.props}
        {...this.props.selected}
        options={formatedOptions}
        onToggle={this.handleToggle}
        onButtonClick={this.handleButtonClick}
        onOptionChange={this.handleOptionChange}
        onSliderChange={this.handleSliderChange}
      />
    )
  }
}

const mapState = (state, props) => {
  return {
    selected: state.userSelect[props.name],
  }
}

export default connect(
  mapState,
  { setButtons, setInput, setToggle, setSlider, setOptions }
)(SelectorContainer)
