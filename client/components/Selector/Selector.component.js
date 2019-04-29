import React from 'react'
import { Checkbox, Button, Segment, Dropdown, Input } from 'semantic-ui-react'

import Slider from './Slider.component'

export default function Selector({
  title,
  buttons = [],
  options = [],
  slider = false,
  domain = [0, 120],
  checked,
  onToggle,
  onButtonClick,
  onOptionChange,
  onSliderChange,
  onInputChange,
  buttonValue,
  optionValue,
  sliderValue,
  input,
  icdSearched,
  showStep,
  toggle = true,
  onStepChange,
}) {
  return (
    <Segment style={{ marginTop: 0, borderRadius: 0, borderRightWidth: 0 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {toggle ? (
            <Checkbox toggle onChange={onToggle} checked={checked} />
          ) : null}
          <span
            style={
              checked || !toggle
                ? { marginLeft: '10px' }
                : { marginLeft: '10px', color: '#aaa' }
            }
          >
            {title}
          </span>
        </div>
        {showStep ? (
          <>
            <Input
              list="stepList"
              placeholder="选择你需要筛选的跨度"
              onChange={onStepChange}
            />
            <datalist id="stepList">
              {Array(10)
                .fill(10)
                .map((n, index) => (
                  <option value={index + 1} key={index} />
                ))}
            </datalist>
          </>
        ) : null}
      </div>

      {buttons.length ? (
        <Button.Group>
          {buttons.map(btnName => (
            <Button
              key={btnName}
              onClick={onButtonClick}
              active={
                Array.isArray(buttonValue)
                  ? buttonValue.includes(btnName)
                  : buttonValue === btnName
              }
            >
              {btnName}
            </Button>
          ))}
        </Button.Group>
      ) : null}

      {slider ? (
        <Slider
          onChange={values => {
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
      {input ? (
        <>
          <Input
            list="datalist"
            icon="search"
            placeholder="Search..."
            style={{ width: '100%' }}
            onChange={onInputChange}
          />
          <datalist id="datalist">
            {/* {icdSearched.length
              ? icdSearched.map(icd => (
                  <option value={icd.short_title} key={icd.icd9_code} />
                ))
              : []} */}
            {/* <option value='English' />
            <option value='Chinese' />
            <option value='Dutch' /> */}
          </datalist>
        </>
      ) : null}
    </Segment>
  )
}
