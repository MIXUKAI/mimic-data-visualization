import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Button, Segment, Select } from 'semantic-ui-react'

import Slider from './Slider.component'

export default function Selector({
  title = 'title',
  buttons = [],
  options = [],
  slider,
  checked,
  toggleCheckbox,
  sliderUpdate,
  onButtonClick,
  buttonValue,
}) {
  const { defaultValues = [10, 80], domain = [0, 120] } = slider || {}

  return (
    <Segment style={{ marginTop: 0, borderRadius: 0, borderRightWidth: 0 }}>
      <p style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox toggle onChange={toggleCheckbox} checked={checked} />
        <span style={{ marginLeft: '10px' }}>{title}</span>
        {/* {slider ? <span>{}</span>} */}
      </p>

      {buttons.length ? (
        <Button.Group>
          {buttons.map(btnName => (
            <Button
              key={btnName}
              disabled={!checked}
              onClick={onButtonClick}
              active={buttonValue === btnName}
            >
              {btnName}
            </Button>
          ))}
        </Button.Group>
      ) : null}

      {slider ? (
        <Slider
          disabled={!checked}
          update={sliderUpdate}
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

Selector.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  buttons: PropTypes.array,
  options: PropTypes.array,
  slider: PropTypes.object,
  toggleCheckbox: PropTypes.func,
  sliderUpdate: PropTypes.func,
  onButtonClick: PropTypes.func,
  buttonValue: PropTypes.string,
}
