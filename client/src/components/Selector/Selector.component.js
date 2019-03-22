import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Checkbox, Button, Segment, Select } from 'semantic-ui-react'

import Slider from './Slider.component'

import { select } from './Selector.duck'

class Selector extends Component {
  update = values => {
    console.log(values)
  }

  toggleCheckbox = () => {
    const { title, checked } = this.props
    this.props.select(title, { checked: !checked })
  }

  renderButtons = () => {
    const { buttons, checked } = this.props
    return (
      <Button.Group>
        {buttons.map(btnName => (
          <Button disabled={!checked}>{btnName}</Button>
        ))}
      </Button.Group>
    )
  }

  render() {
    const {
      title = 'title',
      buttons = [],
      selectOptions = [],
      slider,
      checked,
    } = this.props

    const { defaultValues = [10, 80], domain = [0, 120] } = slider || {}

    const options = selectOptions.length
      ? selectOptions.map(v => ({ key: v, text: v, value: v }))
      : selectOptions
    return (
      <Segment style={{ marginTop: 0, borderRadius: 0, borderRightWidth: 0 }}>
        <p style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox toggle onChange={this.toggleCheckbox} checked={checked} />
          <span style={{ marginLeft: '10px' }}>{title}</span>
          {/* {slider ? <span>{}</span>} */}
        </p>
        {buttons.length ? this.renderButtons() : null}
        {slider ? (
          <Slider
            disabled={!checked}
            update={this.update}
            domain={domain}
            values={defaultValues}
          />
        ) : null}
        {options.length ? (
          <Select
            options={options}
            placeholder="Select you options"
            style={{ width: '100%' }}
            disabled={!checked}
          />
        ) : null}
      </Segment>
    )
  }
}

const mapState = (state, props) => {
  const currentSelector = state.userSelect.selected[props.title] || {}
  return {
    checked: currentSelector.checked || false,
  }
}

export default connect(
  mapState,
  { select }
)(Selector)
