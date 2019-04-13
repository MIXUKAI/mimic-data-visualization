import { all } from 'redux-saga/effects'
import { watchOverview } from './pages/Home/Home.duck'

export default function* rootSaga() {
  yield all([watchOverview()])
}
