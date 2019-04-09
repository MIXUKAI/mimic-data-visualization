import { combineReducers } from 'redux'

import sidebar from './components/SideBar/SideBar.duck'
import navigator from './components/Navigator/Navigator.duck'
import userSelect from './components/Selector/Selector.duck'
import homeOverview  from './pages/Home/Home.duck'

export default combineReducers({
  sidebar,
  navigator,
  userSelect,
  homeOverview,
})
