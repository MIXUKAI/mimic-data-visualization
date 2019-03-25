import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'semantic-ui-react'
import { Toggle } from 'react-powerplug'

function ToggleMenuItem({
  checkedIcon = 'chevron up',
  uncheckedIcon = 'chevron down',
  checked = false,
  itemName,
  children,
}) {
  return (
    <>
      <Toggle initial={checked}>
        {({ on, toggle }) => (
          <>
            <Menu.Item as="a" onClick={toggle}>
              <Icon name={on ? checkedIcon : uncheckedIcon} />
              {itemName}
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
  checked: PropTypes.bool,
  children: PropTypes.element,
  itemName: PropTypes.string.isRequired,
}

export default ToggleMenuItem
