import { combineReducers } from 'redux'
// import { produce } from 'immer'

import undoable from '../../util/undo'
import { SET_DEMOGRAPHIC } from '../AppContainer/AppContainer.duck'
import { menus } from '../../config'
export const USER_SELECT = 'USER_SELECT'
export const SET_USER_SELECT = 'SET_USER_SELECT'
export const SET_TOGGLE = 'SET_TOGGLE'
export const SET_BUTTONS = 'SET_BUTTONS'
export const SET_SLIDER = 'SET_SLIDER'
export const SET_INPUT = 'SET_INPUT'
export const SET_OPTIONS = 'SET_OPTIONS'

const menuSelectors = Object.keys(menus)
  .map(key => menus[key].map(s => s.name))
  .flat()

export const select = (name, values) => ({
  type: USER_SELECT,
  payload: { name, values },
})
export const setToggle = (name, value) => ({ type: SET_TOGGLE, value, name })
export const setButtons = (name, value) => ({ type: SET_BUTTONS, value, name })
export const setSlider = (name, value) => ({ type: SET_SLIDER, value, name })
export const setInput = (name, value) => ({ type: SET_INPUT, value, name })
export const setOptions = (name, value) => ({ type: SET_OPTIONS, value, name })

export const defaultSelector = {
  checked: false,
  buttonValue: [],
  optionValue: '',
  inputValue: '',
  sliderValue: [20, 80],
  type: 'button'
}

function createSelectorWithNameData(
  selectName = '',
  defaultState = defaultSelector
) {
  return (state = defaultState, { type, value, name }) => {
    if (name !== selectName) return state

    switch (type) {
      case SET_TOGGLE:
        return { ...state, checked: value }
      case SET_BUTTONS:
        return { ...state, buttonValue: value, type: 'button' }
      case SET_OPTIONS:
        return { ...state, optionValue: value, type: 'option' }
      case SET_SLIDER:
        return { ...state, sliderValue: value, type: 'slider' }
      case SET_INPUT:
        return { ...state, inputValue: value, type: 'input' }
      default:
        return state
    }
  }
}

// const selected = produce((draft = {}, { type, payload }) => {
//   if (type === USER_SELECT) {
//     const { name, values } = payload

//     draft[name] = draft[name] || { ...defaultSelector }

//     Object.keys(values).forEach(k => {
//       draft[name][k] = values[k]
//     })
//   }
//   // TODO: undo
//   if (type === SET_USER_SELECT) {
//     console.log(payload)
//     draft = payload
//   }
//   return draft
// })

export const selectHistory = undoable((state = {}, action) => {
  if (action.type === SET_DEMOGRAPHIC) {
    state = action.selected
  }
  return state
})

const defaultShowSelector = { checked: true, step: 4 }
let showSelectors = {}
menuSelectors.forEach(s => {
  showSelectors[s] = createSelectorWithNameData(s, defaultShowSelector)
})
// const showSelectors = menuSelectors.reduce(
//   (pre, cur) => { return pre[cur] = createSelectorWithNameData(cur)},
//   {}
// )
console.log('showSelectors', showSelectors)

export default combineReducers({
  icu: createSelectorWithNameData('icu'),
  gender: createSelectorWithNameData('gender'),
  age: createSelectorWithNameData('age', {
    ...defaultSelector,
    type: 'slider',
  }),
  icd9: createSelectorWithNameData('icd9'),
  searchICD: createSelectorWithNameData('searchICD'),
  ...showSelectors,
})

// function createSelectorWithNameData(selectName = '') {
//   return undoable((state = defaultSelector, { type, payload = {} }) => {
//     const { name, values } = payload
//     if (name !== selectName) return state

//     if (type === USER_SELECT) {
//       return { ...state, ...values }
//     }
//     return state
//   })
// }

// export default combineReducers({
//   icu: createSelectorWithNameData('icu'),
//   age: createSelectorWithNameData('age'),
//   gender: createSelectorWithNameData('gender'),
//   icd9: createSelectorWithNameData('icd9'),
//   searchICD: createSelectorWithNameData('searchICD'),
//   ...showSelectors
// })
