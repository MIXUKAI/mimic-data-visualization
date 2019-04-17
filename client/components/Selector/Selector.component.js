import React from 'react'
import { Checkbox, Button, Segment, Dropdown } from 'semantic-ui-react'

import Slider from './Slider.component'

export default function Selector({
  title,
  buttons = [],
  options = [],
  showSlider = false,
  domain = [0, 120],
  checked,
  toggleCheckbox,
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

      {showSlider ? (
        <Slider
          disabled={!checked}
          onChange={(values) => {
            onSliderChange(values)
          }}
          domain={domain}
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
