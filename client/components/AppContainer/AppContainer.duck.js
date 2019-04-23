import { combineReducers } from 'redux'
import Api from '../../util/fetch'
import undoable from '../../util/undo'

export const SET_DEMOGRAPHIC = 'SET_DEMOGRAPHIC'
export const SET_SEARCH_ICD = 'SET_SEARCH_ICD'
export const explore = ({ age, icu, gender }) => async dispatch => {
  const { data } = await Api.get('/explore', {
    params: {
      age,
      icu,
      gender: gender === 'Male' ? 'M' : 'F',
    },
  })
  if (data) {
    dispatch({ type: SET_DEMOGRAPHIC, payload: data })
  }
}

export const searchICD = text => async dispatch => {
  const { data } = await Api.get('/icd/search', {
    params: { icd: text },
  })
  if (data) {
    console.log(data)
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

export const undo = () => dispatch => {
  dispatch({ type: 'UNDO' }) 
}

export const redo = () => dispatch => {
  dispatch({ type: 'REDO' })
}

export default combineReducers({
  demographic: undoable(demographic),
  icdSearched
})
