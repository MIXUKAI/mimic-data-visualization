import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'
import { SliderRail, Handle, Track } from './Slider.ui' // example render components - source below

const sliderStyle = {
  position: 'relative',
  width: '100%',
}

class Example extends Component {

  onUpdate = update => {
    this.props.update(update)
  }

  onChange = values => {
    const { onChange } = this.props
    onChange && onChange(values)
  }

  render() {
    const { domain, values, disabled = false } = this.props
    return (
      <div
        style={{ width: '100%', margin: '0 auto', padding: '0.5em 0 1em 0' }}
      >
        <Slider
          mode={2}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          // onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
          disabled={disabled}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                    disabled={disabled}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
    )
  }
}

export default Example
