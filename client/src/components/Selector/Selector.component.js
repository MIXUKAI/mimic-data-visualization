import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Button, Segment, Dropdown } from 'semantic-ui-react'

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
  onOptionChange,
  onSliderChange,
  buttonValue,
  optionValue,
  sliderValue,
}) {

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
          onChange={values => {
            onSliderChange(values)
          }}
          domain={[0, 120]}
          values={sliderValue}
        />
      ) : null}

      {options.length ? (
        <Dropdown
          selection
          options={options}
          placeholder="Select you options"
          style={{ width: '100%' }}
          disabled={!checked}
          onChange={onOptionChange}
          value={optionValue}
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
  onOptionChange: PropTypes.func,
  optionValue: PropTypes.string,
  onSliderChange: PropTypes.func,
  sliderValue: PropTypes.array,
}
