import { combineReducers } from 'redux'

import selectionConfig from '../../selectionConfig'
import undoable from '../../util/undo'
import { SET_DEMOGRAPHIC } from '../AppContainer/AppContainer.duck'
import { menus } from '../../config'
export const SET_USER_SELECT = 'SET_USER_SELECT'
export const SET_TOGGLE = 'SET_TOGGLE'
export const SET_BUTTONS = 'SET_BUTTONS'
export const SET_SLIDER = 'SET_SLIDER'
export const SET_INPUT = 'SET_INPUT'
export const SET_OPTIONS = 'SET_OPTIONS'
export const SET_MMA = 'SET_MMA'


export const setMma = (name, value) => ({
  type: SET_MMA,
  value,
  name
})

const menuSelectors = Object.keys(menus)
  .map(key => menus[key].map(s => s.name))
  .flat()

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
  type: 'button',
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
      case SET_MMA:
        return { ...state, mma: value }
      default:
        return state
    }
  }
}

export const selectHistory = undoable((state = {}, action) => {
  if (action.type === SET_DEMOGRAPHIC) {
    state = action.selected
  }
  return state
})

const defaultShowSelector = { checked: true, step: 4, mma: 'max' }
let showSelectors = {}
menuSelectors.forEach(s => {
  showSelectors[s] = createSelectorWithNameData(s, defaultShowSelector)
})

console.log('showSelectors', showSelectors)

const selections = {}
Object.keys(selectionConfig).forEach(k => {
  const config = selectionConfig[k]
  if (config.type === 'slider') {
    selections[k] = createSelectorWithNameData(k, {
      ...defaultSelector,
      type: 'slider',
    })
  } else {
    selections[k] = createSelectorWithNameData(k)
  }
})

export default combineReducers({
  ...selections,
  ...showSelectors,
})
