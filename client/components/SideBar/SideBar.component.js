import React from 'react'
import PropTypes from 'prop-types'
import { Sidebar, Menu, Icon, Button } from 'semantic-ui-react'

import Selector from '../Selector/Selector.container'
import ToggleMenuItem from './ToggleMenuItem.component'
import { menus } from '../../config'

const selectOptions = [
  'Infectious or Parasitic Disease',
  'Neoplasms',
  'Endocrine, Nutritional and Metabolic, and Immunity Disorders',
  'Blood or Blood-Forming Organ Disease',
  'Mental Disorders',
  'Nervous System Disease',
  'Sensory Organ Diseaes',
]

const VerticalSidebar = ({ visible = false, plot }) => (
  <Sidebar
    animation="push"
    direction="left"
    icon="labeled"
    vertical
    visible={visible}
    width="wide"
  >
    <Menu vertical style={{ width: '100%', borderRadius: 0 }}>
      <Menu.Item as="a">
        <Icon name="home" />
        Instructions
      </Menu.Item>
      <ToggleMenuItem itemName="Selection Criteria">
        <Selector
          buttons={['CCU', 'CSRU', 'MICU', 'SICU']}
          title="First ICU Service"
          name="icu"
        />
        <Selector buttons={['Male', 'Female']} title="Gender" name="gender" />
        <Selector title="Age" name="age" showSlider />
        <Selector title="Primary ICD9" name="icd9" options={selectOptions} />
      </ToggleMenuItem>
      {
        Object.keys(menus).map(groupName => {
          return (
            <ToggleMenuItem itemName={groupName} key={groupName}>
              {menus[groupName].map(({ name, title }) => 
                <Selector title={title} name={name} key={name} />
              )}
            </ToggleMenuItem>
          )
        })
      }
    </Menu>
    <Button style={{ width: '98%', padding: '1em 0' }} onClick={plot} primary>
      Plot
    </Button>
  </Sidebar>
)

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

export default VerticalSidebar
