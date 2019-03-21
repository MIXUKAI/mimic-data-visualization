import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react'
import { Toggle } from 'react-powerplug'

function ToggleMenuItem({
  checkedIcon = 'chevron up',
  uncheckedIcon = 'chevron down',
  children,
}) {
  return (
    <>
      <Toggle initial={false}>
        {({ on, toggle }) => (
          <>
            <Menu.Item as="a" onClick={toggle}>
              <Icon name={on ? checkedIcon : uncheckedIcon} />
              Instructions
            </Menu.Item>

            <div
              style={{
                display: on ? 'flex' : 'none',
                flexWrap: 'wrap',
                flexDirection: 'column',
              }}
            >
              {children}
            </div>
          </>
        )}
      </Toggle>
    </>
  )
}

ToggleMenuItem.propTypes = {
  checkedIcon: PropTypes.string,
  uncheckedIcon: PropTypes.string,
  children: PropTypes.element,
}

export default ToggleMenuItem
