import { combineReducers } from 'redux'
import Api from '../../util/fetch'

const SET_ADMISSION = 'SET_ADMISSION'

export const overview = () => async (dispatch) => {
  const { data } = await Api.get('/overview')
  if (data) {
    dispatch({ type: SET_ADMISSION, payload: data })
  }
}

const admission = (state = [], action) => {
  if (action.type === SET_ADMISSION) {
    state = action.payload
  }
  return state
}

export default combineReducers({
  admission,
})
