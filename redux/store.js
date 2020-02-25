import { createStore } from "./lib/createStore";
import applyMiddleware from "./lib/applyMiddleware";
import logger from './middlewares/logger';
import thunk from './middlewares/thunk';
import createPuppyMiddleware from "./middlewares/puppyMiddleware";
import { rootReducer } from "./root.reducer";
import { rootSaga } from "./root.saga";

const puppyMiddleware = createPuppyMiddleware();

const middlewares = [logger, thunk, puppyMiddleware];

const preloadedState = undefined;
const _store = createStore(rootReducer, preloadedState, applyMiddleware(...middlewares));

puppyMiddleware.run(rootSaga);

export const store = _store;