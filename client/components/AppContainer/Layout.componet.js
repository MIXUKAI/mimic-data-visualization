import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar } from 'semantic-ui-react'

import Navigator from '../Navigator/Navigator.component'
import VerticalSidebar from '../SideBar/SideBar.component'
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
      default:
        return item.checked
    }
  }

  plot = () => {
    const { userSelect } = this.props
    const { icu, icd9, age, gender, icdCode } = userSelect
    const icuValue = this.getValue(icu)
    const ageValue = this.getValue(age)
    const genderValue = this.getValue(gender)
    // const icdCodeValue = this.getValue(icdCode)
    console.log(icuValue, ageValue, genderValue)
    this.props.explore({
      age: ageValue,
      gender: genderValue,
      icu: icuValue,
      // icdCode: icdCodeValue,
    })
  }

  render() {
    const { visible, children, searchICD, icdSearched } = this.props
    return (
      <Sidebar.Pushable className="sidebar-container">
        <VerticalSidebar
          visible={visible}
          className="sidebar"
          plot={this.plot}
          searchICD={searchICD}
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
  userSelect: state.userSelect.selected,
})

export default connect(
  mapState,
  { explore, searchICD }
)(PushableSideBar)
