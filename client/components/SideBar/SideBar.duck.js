import { combineReducers } from 'redux'

const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'

export const toggleSidebar = () => ({ type: TOGGLE_SIDEBAR })

const isSidebarOpen = (state = false, { type }) =>
  type === TOGGLE_SIDEBAR ? !state : state

export default combineReducers({
  isSidebarOpen,
})
