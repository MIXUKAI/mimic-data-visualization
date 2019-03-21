import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Sidebar, Menu, Icon, Button } from 'semantic-ui-react'

import Selector from '../Selector/Selector.component'
import ToggleMenuItem from './ToggleMenuItem.component'

const selectOptions = [
  'Infectious or Parasitic Disease',
  'Neoplasms',
  'Endocrine, Nutritional and Metabolic, and Immunity Disorders',
  'Blood or Blood-Forming Organ Disease',
  'Mental Disorders',
  'Nervous System Disease',
  'Sensory Organ Diseaes',
]

const VerticalSidebar = ({ visible = false, show = true }) => (
  <Sidebar
    // as={Menu}
    animation="push"
    direction="left"
    icon="labeled"
    vertical
    visible={visible}
    width="wide"
  >
    <Menu vertical style={{ width: '100%', borderRadius: 0 }}>
      <Menu.Item
        as="a"
        onClick={() => {
          console.log('sdds')
        }}
      >
        <Icon name="home" />
        Instructions
      </Menu.Item>
      <ToggleMenuItem itemName="Selection Criteria">
        <Selector
          buttons={['CCU', 'CSRU', 'MICU', 'SICU']}
          title="First ICU Service"
        />
        <Selector buttons={['Male', 'Female']} title="Gender" />
        <Selector
          title="Age"
          slider={{ domain: [0, 120], defaultValues: [20, 80] }}
        />
        <Selector title="Primary ICD9" selectOptions={selectOptions} />
      </ToggleMenuItem>
    </Menu>
    <Button style={{ width: '98%', padding: '1em 0' }} primary>
      Plot
    </Button>
  </Sidebar>
)

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

class PushableSideBar extends Component {
  state = {
    visible: false,
  }
  render() {
    const { visible, children } = this.props
    return (
      <Sidebar.Pushable className="sidebar-container">
        <VerticalSidebar visible={this.state.visible} className="sidebar" />
        <Sidebar.Pusher>
          {children}
          <Button
            onClick={() => {
              this.setState(state => ({ visible: !state.visible }))
            }}
          >
            Show SideBar
          </Button>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

export default PushableSideBar
