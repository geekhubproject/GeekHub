import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "../saga";
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(watcherSaga, createSagaMiddleware)
)

export default configureStore
