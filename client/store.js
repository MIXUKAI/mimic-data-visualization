import { createStore, applyMiddleware, compose } from 'redux'

import createSagaMiddleWare from 'redux-saga'
import logger from 'redux-logger'

import rootReducer from './root.reducer'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleWare()

export default function configureStore(preloadedState) {
  const middlewares = [logger, sagaMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const storeEnhancers = [middlewareEnhancer]

  const composedEnhancer = compose(...storeEnhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancer)
  
  sagaMiddleware.run(rootSaga)

  return store
}
