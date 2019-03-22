import { combineReducers } from 'redux'
import { produce } from 'immer'

const USER_SELECT = 'USER_SELECT'
type USER_SELECT = typeof USER_SELECT

export interface Select {
  type: USER_SELECT
  payload: object
}

export const select = (name: string, values: any): Select => ({
  type: USER_SELECT,
  payload: { name, values },
})

export const defaultSelector = {
  checked: false,
  buttonValue: '',
  optionValue: '',
  sliderValue: [20, 80],
}

export interface SelectState {
  checked: boolean
  buttonValue: string
  optionValue: string
  sliderValue: number[]
  [key: string]: any
}

const selected = produce(
  (draft = defaultSelector, { type, payload }): SelectState => {
    if (type === USER_SELECT) {
      const { name, values } = payload

      draft[name] = draft[name] || { ...defaultSelector }

      Object.keys(values).forEach(k => {
        draft[name][k] = values[k]
      })
    }
    return draft
  }
)

export default combineReducers({
  selected,
})
