import React, { Component } from 'react'
import { connect } from 'react-redux'

import Selector from './Selector.component'

import { select, defaultSelector, SelectState } from './Selector.duck'

interface SelectorProps {
  title: string
  checked: boolean
  buttons?: string[]
  options?: string[]
  showSlider?: boolean
  domain?: [number, number]
  currentSelector: SelectState
  select: (name: string, value: any) => void
}

class SelectorContainer extends Component<SelectorProps, object> {
  updateState = (k: string, v: string | [number, number] | boolean) => {
    const { title } = this.props
    this.props.select(title, { [k]: v })
  }

  toggleCheckbox = () => {
    const { currentSelector } = this.props
    this.updateState('checked', !currentSelector.checked)
  }

  handleButtonClick = (e: React.MouseEvent) => {
    this.updateState('buttonValue', (e.target as HTMLElement)
      .textContent as string)
  }

  handleOptionChange = (e: React.MouseEvent) => {
    this.updateState('optionValue', (e.target as HTMLElement)
      .textContent as string)
  }

  handleSliderChange = (values: [number, number]) => {
    this.updateState('sliderValue', values)
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

const mapState = (state: SelectState, props: SelectorProps) => {
  return {
    currentSelector: state.userSelect.selected[props.title] || defaultSelector,
  }
}

export default connect(
  mapState,
  { select }
)(SelectorContainer)
