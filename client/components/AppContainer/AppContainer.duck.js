import { combineReducers } from 'redux'
import Api from '../../util/fetch'
import undoable from '../../util/undo'
import { SET_USER_SELECT } from '../Selector/Selector.duck'

export const SET_DEMOGRAPHIC = 'SET_DEMOGRAPHIC'
export const SET_FETCHING = 'SET_FETCHING'
export const SET_SEARCH_ICD = 'SET_SEARCH_ICD'
export const explore = ({ age, icu, gender, show_age }) => async (dispatch, getState) => {
  dispatch(setFetching(true))
  const selected = getState().userSelect
  try {
    const { data } = await Api.get('/explore', {
      params: {
        age,
        icu,
        gender: gender.map(g => g === 'Male' ? 'M' : 'F'),
        show_age: [show_age.checked, show_age.step],
      }
    })
    if (data) {
      dispatch(setFetching(false))
      dispatch({ type: SET_DEMOGRAPHIC, payload: data, selected })
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
    return true
  }
  return false
}

export default combineReducers({
  demographic: undoable(demographic),
  icdSearched,
  isFetching,
})
