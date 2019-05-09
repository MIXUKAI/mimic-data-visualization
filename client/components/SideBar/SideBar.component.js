import React from 'react'
import PropTypes from 'prop-types'
import { Sidebar, Menu, Icon, Button } from 'semantic-ui-react'

import Selector from '../Selector/Selector.container'
import ToggleMenuItem from './ToggleMenuItem.component'
import { menus } from '../../config'
import selectionConfig from '../../selectionConfig'

// const selectOptions = [
//   'Infectious or Parasitic Disease',
//   'Neoplasms',
//   'Endocrine, Nutritional and Metabolic, and Immunity Disorders',
//   'Blood or Blood-Forming Organ Disease',
//   'Mental Disorders',
//   'Nervous System Disease',
//   'Sensory Organ Diseaes',
// ]

const VerticalSidebar = ({
  visible = false,
  plot,
  searchICD,
  isFetching,
  toggleSidebar,
}) => (
  <Sidebar
    animation="overlay"
    direction="left"
    icon="labeled"
    vertical
    visible={visible}
    width="very wide"
    style={{ backgroundColor: 'rgba(255,255,255,.8)' }}
  >
    <Menu vertical style={{ width: '100%', borderRadius: 0 }}>
      <Button
        onClick={toggleSidebar}
        style={{ width: '100%', borderRadius: 0 }}
      >
        <Icon name="backward" />
        收起来
      </Button>
      <ToggleMenuItem itemName="Selection Criteria">
        {Object.keys(selectionConfig).map(k => {
          const config = selectionConfig[k]
          const props = {
            toggle: false,
            title: config.title,
            name: k,
          }
          if (config.type === 'slider') {
            props.slider = true
          } else {
            props.buttons = config.value
          }
          return (
            <Selector
              {...props}
            />
          )
        })}
        {/* <Selector
          toggle={false}
          buttons={['CCU', 'CSRU', 'MICU', 'SICU', 'NICU', 'TSICU']}
          title="请选择第一个重症监护室服务"
          name="icu"
        />
        <Selector
          toggle={false}
          buttons={['EMERGENCY', 'NEWBORN', 'ELECTIVE', 'URGENT']}
          title="请选择入院的类型"
          name="admissionType"
        />
        <Selector
          toggle={false}
          buttons={['Male', 'Female']}
          title="请选择性别"
          name="gender"
        />
        <Selector
          toggle={false}
          buttons={['MARRIED', 'SINGLE', 'DIVORCED']}
          title="婚姻状况"
          name="marital"
        />

        <Selector title="请选择年龄范围" name="age" toggle={false} slider /> */}

        {/* <Selector title="Primary ICD9" name="icd9" options={selectOptions} />
        <Selector
          title="search ICD"
          name="searchICD"
          input
          onInputChanged={searchICD}
          toggle={false}
        /> */}
      </ToggleMenuItem>
      {Object.keys(menus).map(groupName => {
        return (
          <ToggleMenuItem itemName={groupName} key={groupName}>
            {menus[groupName].map(({ name, cname, showStep }) => (
              <Selector
                title={cname}
                name={name}
                key={name}
                showStep={showStep}
              />
            ))}
          </ToggleMenuItem>
        )
      })}
    </Menu>
    <Button
      style={{ width: '100%', padding: '1em 0' }}
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
