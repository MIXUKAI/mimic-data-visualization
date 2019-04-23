import { combineReducers } from 'redux'
// import { produce } from 'immer'

import undoable from '../../util/undo'
import { SET_DEMOGRAPHIC } from '../AppContainer/AppContainer.duck'
import { menus } from '../../config'
export const USER_SELECT = 'USER_SELECT'
export const SET_USER_SELECT = 'SET_USER_SELECT'


const menuSelectors = Object.keys(menus)
  .map(key => menus[key].map(s => s.name))
  .flat()

export const select = (name, values) => ({
  type: USER_SELECT,
  payload: { name, values },
})

export const defaultSelector = {
  checked: false,
  buttonValue: [],
  optionValue: '',
  inputValue: '',
  sliderValue: [20, 80],
  type: 'button',
}

function createSelectorWithNameData(selectName = '', defaultState = defaultSelector) {
  return (state = defaultState, { type, payload = {} }) => {
    const { name, values } = payload
    if (name !== selectName) return state

    if (type === USER_SELECT) {
      return { ...state, ...values }
    }
    return state
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

let showSelectors = {}
menuSelectors.forEach(s => {
  showSelectors[s] = createSelectorWithNameData(s, { ...defaultSelector, checked: true, step: 4 })
})
// const showSelectors = menuSelectors.reduce(
//   (pre, cur) => { return pre[cur] = createSelectorWithNameData(cur)},
//   {}
// )
console.log('showSelectors', showSelectors)

export default combineReducers({
  icu: createSelectorWithNameData('icu'),
  gender: createSelectorWithNameData('gender'),
  age: createSelectorWithNameData('age', { ...defaultSelector, type: 'slider' }),
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
