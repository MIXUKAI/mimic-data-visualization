import { combineReducers } from 'redux'

import sidebar from './components/SideBar/SideBar.duck'
import navigator from './components/Navigator/Navigator.duck'

export default combineReducers({
  sidebar,
  navigator,
})
