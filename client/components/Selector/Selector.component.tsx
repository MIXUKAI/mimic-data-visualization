import React from 'react'
import { Checkbox, Button, Segment, Dropdown } from 'semantic-ui-react'

import Slider from './Slider.component'

interface SelectorProps1 {
  title: string
  checked: boolean
  buttons?: string[]
  options?: object[]
  showSlider?: boolean
  domain?: number[]
  buttonValue?: string
  optionValue?: string
  sliderValue?: number[]
  onButtonClick?: (event: any) => void
  toggleCheckbox?: () => void
  onOptionChange?: (event: any) => void
  onSliderChange?: (values: [number, number]) => void
}

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
}: SelectorProps1) {
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
          onChange={(values: [number, number]) => {
            onSliderChange!(values)
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
