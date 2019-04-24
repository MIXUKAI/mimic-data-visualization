import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar } from 'semantic-ui-react'

import Navigator from '../Navigator/Navigator.component'
import VerticalSidebar from '../SideBar/SideBar.component'
import { toggleSidebar } from '../SideBar/SideBar.duck'
import { explore, searchICD } from './AppContainer.duck'

class PushableSideBar extends Component {
  getValue = item => {
    switch (item.type) {
      case 'button':
        return item.buttonValue
      case 'option':
        return item.optionValue
      case 'slider':
        return item.sliderValue
      case 'input':
        return item.inputValue
      case 'step':
        return item.step
      default:
        return item.checked
    }
  }

  plot = () => {
    const { userSelect } = this.props
    const { icu, age, gender, show_age } = userSelect
    const icuValue = this.getValue(icu)
    const ageValue = this.getValue(age)
    const genderValue = this.getValue(gender)
    console.log(icuValue, ageValue, genderValue)
    this.props.explore({
      age: ageValue,
      gender: genderValue,
      icu: icuValue,
      show_age,
    })
  }

  render() {
    const { visible, children, toggleSidebar, searchICD, icdSearched, isFetching } = this.props
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
