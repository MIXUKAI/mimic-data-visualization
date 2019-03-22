import { combineReducers } from 'redux'
import { produce } from 'immer'

const USER_SELECT = 'USER_SELECT'

export const select = (name, value) => ({
  type: USER_SELECT,
  payload: { name, value },
})

const defaultState = {
  gender: {
    checked: true,
    value: 'Male',
  },
}

const selected = produce((draft = defaultState, { type, payload }) => {
  if (type === USER_SELECT) {
    const { name, value } = payload
    draft[name] = value
  }
  return draft
})

export default combineReducers({
  selected,
})
