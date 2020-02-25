import { dog } from "./dog/reducer";
import { counter } from "./counter/reducer";

import { combineReducers } from "./lib/combineReducers";

export const rootReducer = combineReducers({
  counter,
  dog
});