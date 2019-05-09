import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar } from 'semantic-ui-react'

import Navigator from '../Navigator/Navigator.component'
import VerticalSidebar from '../SideBar/SideBar.component'
import { toggleSidebar } from '../SideBar/SideBar.duck'
import { explore, searchICD } from './AppContainer.duck'

class PushableSideBar extends Component {
  plot = () => {
    this.props.explore(this.props.userSelect)
  }

  render() {
    const { visible, children, toggleSidebar, searchICD, isFetching } = this.props
    return (
      <Sidebar.Pushable className="sidebar-container">
        <VerticalSidebar
          visible={visible}
          className="sidebar"
          plot={this.plot}
          searchICD={searchICD}
          isFetching={isFetching}
          toggleSidebar={toggleSidebar}
        />
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
  userSelect: state.userSelect,
  isFetching: state.explore.isFetching,
})

export default connect(
  mapState,
  { explore, searchICD, toggleSidebar }
)(PushableSideBar)
