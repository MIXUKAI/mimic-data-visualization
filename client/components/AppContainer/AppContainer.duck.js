import { combineReducers } from 'redux'
import Api from '../../util/fetch'

export const SET_DEMOGRAPHIC = 'SET_DEMOGRAPHIC'
export const explore = ({ age, icu, gender }) => async (dispatch) => {
  const { data } = await Api.get('/explore', {
    params: {
      age,
      icu,
      gender: gender === 'Male' ? 'M' : 'F',
    }
  })
  if (data) {
    dispatch({ type: SET_DEMOGRAPHIC, payload: data })
  }
}


const defaultDemographicState = {
  gender: [],
  religion: [],
  ethnicity: [],
  marital: [],
}
const demographic = (state = defaultDemographicState, { type, payload }) => {
  return type === SET_DEMOGRAPHIC ? (state = payload) : state
}

export default combineReducers({
  demographic,
})