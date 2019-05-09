import { combineReducers } from 'redux'
import Api from '../../util/fetch'
import undoable from '../../util/undo'
import { SET_USER_SELECT } from '../Selector/Selector.duck'
import selectionConfig from '../../selectionConfig'
import { menus as menuConfig } from '../../config'

const getValue = item => {
  switch (item.type) {
    case 'button':
      return item.buttonValue
    case 'option':
      return item.optionValue
    case 'slider':
      return item.sliderValue
    case 'input':
      return item.inputValue
    case 'step':
      return item.step
    default:
      return item.checked
  }
}

export const SET_DEMOGRAPHIC = 'SET_DEMOGRAPHIC'
export const SET_FETCHING = 'SET_FETCHING'
export const SET_SEARCH_ICD = 'SET_SEARCH_ICD'
export const explore = () => async (dispatch, getState) => {
  dispatch(setFetching(true))
  try {
    const userSelect = getState().userSelect
    const params = {}
    Object.keys(menuConfig).forEach((group) => {
      params[group] = {}
      menuConfig[group].forEach((selection) => {
        params[group][selection.name] = userSelect[selection.name]
      })
    })
    Object.keys(selectionConfig).forEach(k => {
      const config = selectionConfig[k]
      const s = { ...userSelect[k], type: config.type }
      params[k] = getValue(s)
    })
    console.log(params)
    const { data } = await Api.get('/explore', { params })
    if (data) {
      dispatch(setFetching(false))
      dispatch({ type: SET_DEMOGRAPHIC, payload: data })
    }
  } catch (error) {
    dispatch(setFetching(false))
  }
}

export const searchICD = text => async dispatch => {
  const { data } = await Api.get('/icd/search', {
    params: { icd: text },
  })
  if (data) {
    dispatch({ type: SET_SEARCH_ICD, payload: data })
  }
}

const defaultDemographicState = {
  gender: [],
  religion: [],
  age: [],
  ethnicity: [],
  marital: [],
}
const demographic = (state = defaultDemographicState, { type, payload }) => {
  return type === SET_DEMOGRAPHIC ? (state = payload) : state
}

const icdSearched = (state = [], { type, payload }) => {
  return type === SET_SEARCH_ICD ? payload : state
}

export const undo = () => (dispatch, getState) => {
  const selected = getState().userSelect
  dispatch({ type: 'UNDO' })
  dispatch({ type: SET_USER_SELECT, payload: selected })
}

export const redo = () => (dispatch, getState) => {
  const selected = getState().userSelect
  dispatch({ type: 'REDO' })
  dispatch({ type: SET_USER_SELECT, payload: selected })
}

export const setFetching = (isFetching) => dispatch => {
  dispatch({ type: SET_FETCHING, payload: isFetching })
}

const isFetching = (state = false, action) => {
  if (action.type === SET_FETCHING) {
    return action.payload
  }
  return state
}

export default combineReducers({
  demographic: undoable(demographic),
  icdSearched,
  isFetching,
})
