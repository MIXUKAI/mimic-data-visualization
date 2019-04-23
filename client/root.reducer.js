import { combineReducers } from 'redux'

import sidebar from './components/SideBar/SideBar.duck'
import navigator from './components/Navigator/Navigator.duck'
import userSelect, { selectHistory } from './components/Selector/Selector.duck'
import homeOverview  from './pages/Home/Home.duck'
import explore from './components/AppContainer/AppContainer.duck'
import chart from './components/Chart/Chart.duck'

export default combineReducers({
  sidebar,
  navigator,
  userSelect,
  selectHistory,
  homeOverview,
  explore,
  chart,
})
