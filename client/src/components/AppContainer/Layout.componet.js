import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar } from 'semantic-ui-react'

import Navigator from '../Navigator/Navigator.component'
import VerticalSidebar from '../SideBar/SideBar.component'

class PushableSideBar extends Component {
  render() {
    const { visible, children } = this.props
    return (
      <Sidebar.Pushable className="sidebar-container">
        <VerticalSidebar visible={visible} className="sidebar" />
        <Sidebar.Pusher>
          <Navigator />
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

const mapState = state => ({
  visible: state.sidebar.isSidebarOpen,
})

export default connect(mapState)(PushableSideBar)
