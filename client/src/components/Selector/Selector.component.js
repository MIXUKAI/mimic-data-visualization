import React, { Component } from 'react'
import { Header, Checkbox, Button, Segment, Select } from 'semantic-ui-react'
import Slider from '../Slider/Slider.component'

class Selector extends Component {
  state = {
    checked: false,
  }

  update = values => {
    console.log(values)
  }

  toggleCheckbox = () => {
    this.setState(state => ({ checked: !state.checked }))
  }

  renderButtons = () => {
    const { buttons } = this.props
    const { checked } = this.state
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
    } = this.props
    const { checked } = this.state

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

export default Selector
