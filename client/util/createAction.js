import { store } from '../App'

export default function createAction(type, prePayload = {}) {
  return function(payload = {}) {
    return store.dispatch({ type, ...{ ...prePayload, ...payload } })
  }
}
