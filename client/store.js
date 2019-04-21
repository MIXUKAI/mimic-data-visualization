import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './root.reducer'

export default function configureStore(preloadedState) {
  const middlewares = [thunk, logger]
  
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const store = createStore(rootReducer, preloadedState, middlewareEnhancer)
  
  return store
}
