import { combineReducers } from 'redux'
import { produce } from 'immer'

const USER_SELECT = 'USER_SELECT'

export const select = (name, values) => ({
  type: USER_SELECT,
  payload: { name, values },
})

export const defaultSelector = {
  checked: false,
  buttonValue: '',
  optionValue: '',
  sliderValue: [20, 80],
}

const selected = produce((draft = {}, { type, payload }) => {
  if (type === USER_SELECT) {
    const { name, values } = payload

    draft[name] = draft[name] || { ...defaultSelector }

    Object.keys(values).forEach(k => {
      draft[name][k] = values[k]
    })
  }
  return draft
})

export default combineReducers({
  selected,
})
