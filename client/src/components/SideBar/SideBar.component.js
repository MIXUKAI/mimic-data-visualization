import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Sidebar, Menu, Icon, Input } from 'semantic-ui-react'

import Selector from '../Selector/Selector.component'

const selectOptions = [
  'Infectious or Parasitic Disease',
  'Neoplasms',
  'Endocrine, Nutritional and Metabolic, and Immunity Disorders',
  'Blood or Blood-Forming Organ Disease',
  'Mental Disorders',
  'Nervous System Disease',
  'Sensory Organ Diseaes',
]

const VerticalSidebar = ({ visible = true, show = true }) => (
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
      <div
        style={{
          display: show ? 'flex' : 'none',
          flexWrap: 'wrap',
          flexDirection: 'column',
        }}
      >
        <Selector
          buttons={['CCU', 'CSRU', 'MICU', 'SICU']}
          title="First ICU Service"
        />
        <Selector buttons={['Male', 'Female']} title="Gender" />
        <Selector
          title="Age"
          slider={{ domain: [0, 120], defaultValues: [20, 80] }}
        />
        <Selector
          title="Primary ICD9"
          selectOptions={selectOptions}
        />
      </div>
      <Menu.Item as="a">
        <Icon name="home" />
        Instructions
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="home" />
        Instructions
      </Menu.Item>
    </Menu>
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
