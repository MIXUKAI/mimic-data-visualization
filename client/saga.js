import { all } from 'redux-saga/effects'
import { watchOverview } from './pages/Home/Home.duck'

function* helloSaga() {
  console.log('Hello Sagas!')
}

export default function* rootSaga() {
  yield all([helloSaga(), watchOverview()])
}
