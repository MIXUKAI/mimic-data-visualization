import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar } from 'semantic-ui-react'

import Navigator from '../Navigator/Navigator.component'
import VerticalSidebar from '../SideBar/SideBar.component'

class PushableSideBar extends Component {

  plot = () => {
    const { userSelect } = this.props
    const { icu, icd9, age, gender } = userSelect
  }

  render() {
    const { visible, children, userSelect } = this.props
    return (
      <Sidebar.Pushable className="sidebar-container">
        <VerticalSidebar visible={visible} className="sidebar" plot={this.plot}/>
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
})

export default connect(mapState)(PushableSideBar)
