import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Sidebar, Menu, Icon } from 'semantic-ui-react'

const VerticalSidebar = ({ visible = true }) => (
  <Sidebar
    // as={Menu}
    animation="push"
    direction="left"
    icon="labeled"
    inverted
    vertical
    visible={visible}
    width="very wide"
  >

    {/* <Menu.Item as="a">
      <Icon name="home" />
      Home
    </Menu.Item>
    <Menu.Item as="a">
      <Icon name="gamepad" />
      Games
    </Menu.Item>
    <Menu.Item as="a">
      <Icon name="camera" />
      Channels
    </Menu.Item> */}
  </Sidebar>
)

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

class PushableSideBar extends Component {
  render() {
    const { visible, children } = this.props
    return (
      <Sidebar.Pushable>
        <VerticalSidebar visible={visible} />
        <Sidebar.Pusher>{children}</Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

export default PushableSideBar
