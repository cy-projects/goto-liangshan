import { createStore, applyMiddleware, combineReducers } from 'redux';

import logger from 'redux-logger'
import thunk from 'redux-thunk'

import * as reducers from './reducers.js'
const todoApp = combineReducers(reducers);

const store = createStore(
  todoApp,
  applyMiddleware(
    logger,
    thunk
  )
);

export default store;
