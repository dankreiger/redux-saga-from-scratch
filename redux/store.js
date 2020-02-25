import { createStore } from "./lib/createStore";
import { counter } from "./counter/reducer";
import { dog } from "./dog/reducer";
import applyMiddleware from "./lib/applyMiddleware";
import { combineReducers } from "./lib/combineReducers";
import logger from './middlewares/logger';
import thunk from './middlewares/thunk';
import createPuppyMiddleware from "./middlewares/puppyMiddleware";
// const { call} = require('./middlewares/saga').effects;
import { put, take, call } from './lib/effects';
const puppyMiddleware = createPuppyMiddleware();
// const sagaPup = sagaMiddleware();


const middlewares = [logger, thunk, 
 // sagaPup,
  puppyMiddleware];


function* woofWatcher() {
  while(true) {
    yield take('INCREMENT');
    console.log('cool, increment');
    yield take('DECREMENT');
    console.log('decrement was dispatched');
  }
}

function* rootSaga() {
  yield call(woofWatcher);
}

const rootReducer = combineReducers({
  counter,
  dog
})

const preloadedState = undefined;
export const storeInstance = createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

// so we can debug in the browser
window.store = storeInstance;
puppyMiddleware.run(rootSaga);
export const store = storeInstance;