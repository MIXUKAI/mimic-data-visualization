import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar } from 'semantic-ui-react'

import Navigator from '../Navigator/Navigator.component'
import VerticalSidebar from '../SideBar/SideBar.component'
import { explore } from './AppContainer.duck'

class PushableSideBar extends Component {

  getValue = (item) => {
    switch (item.type) {
      case 'button':
        return item.buttonValue
      case 'option':
        return item.optionValue
      case 'slider':
        return item.sliderValue
      default:
        return item.checked
    }
  }

  plot = () => {
    const { userSelect } = this.props
    const { icu, icd9, age, gender } = userSelect
    const icuValue = this.getValue(icu)
    const ageValue = this.getValue(age)
    const genderValue = this.getValue(gender)
    console.log(icuValue, ageValue, genderValue)
    this.props.explore({ age: ageValue, gender: genderValue, icu: icuValue })
  }

  render() {
    const { visible, children, userSelect } = this.props
    return (
      <Sidebar.Pushable className="sidebar-container">
        <VerticalSidebar visible={visible} className="sidebar" plot={this.plot} />
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

export default connect(mapState, { explore })(PushableSideBar)
