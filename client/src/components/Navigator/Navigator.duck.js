import { combineReducers } from 'redux'

const NAVIGATE = 'NAVIGATE'

export const setView = view => ({ type: NAVIGATE, payload: view })

const currentView = (state = 'Home', { type, payload }) =>
  type === NAVIGATE ? (state = payload) : state

export default combineReducers({
  currentView,
})
