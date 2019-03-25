import { createStore, applyMiddleware, compose } from 'redux'

import createSagaMiddleWare from 'redux-saga'
import logger from 'redux-logger'

import rootReducer from './root.reducer'

const sagaMiddleware = createSagaMiddleWare()

export default function configureStore(preloadedState) {
  const middlewares = [sagaMiddleware, logger]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const storeEnhancers = [middlewareEnhancer]

  const composedEnhancer = compose(...storeEnhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancer)

  return store
}
