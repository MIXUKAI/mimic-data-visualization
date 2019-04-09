import { call, put, take, takeEvery } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import Api from '../../util/fetch'
import createAction from '../../util/createAction'

//
// ─── TYPE CONSTANTS ──────────────────────────────────────────────────────────────
//

const OVERVIEW = 'OVERVIEW'
const SET_ADMISSION = 'SET_ADMISSION'

//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//

export const fetchOverview = createAction(OVERVIEW)

//
// ─── SAGA ───────────────────────────────────────────────────────────────────────
//

export function* overview() {
  const { data } = yield call(Api.get, '/overview')
  yield put({ type: SET_ADMISSION, payload: data })
}

export function* watchOverview() {
  yield takeEvery(OVERVIEW, overview)
}

//
// ─── REDUCER ────────────────────────────────────────────────────────────────────
//

const admission = (state = [], action) => {
  if (action.type === SET_ADMISSION) {
    state = action.payload
  }
  return state
}

export default combineReducers({
  admission,
})
