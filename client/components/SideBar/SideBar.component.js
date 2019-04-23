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

const VerticalSidebar = ({ visible = false, plot, searchICD, isFetching }) => (
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
          showCheckBox={false}
          buttons={['CCU', 'CSRU', 'MICU', 'SICU']}
          title="First ICU Service"
          name="icu"
        />
        <Selector
          showCheckBox={false}
          buttons={['Male', 'Female']}
          title="Gender"
          name="gender"
        />
        <Selector title="Age" name="age" showSlider showCheckBox={false} />
        <Selector title="Primary ICD9" name="icd9" options={selectOptions} />
        <Selector
          title="search ICD"
          name="searchICD"
          input
          onInputChanged={searchICD}
          showCheckBox={false}
        />
      </ToggleMenuItem>
      {Object.keys(menus).map(groupName => {
        return (
          <ToggleMenuItem itemName={groupName} key={groupName}>
            {menus[groupName].map(({ name, cname, showStep }) => (
              <Selector title={cname} name={name} key={name} showStep={showStep}/>
            ))}
          </ToggleMenuItem>
        )
      })}
    </Menu>
    <Button
      style={{ width: '98%', padding: '1em 0' }}
      onClick={plot}
      primary
      loading={isFetching}
    >
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
