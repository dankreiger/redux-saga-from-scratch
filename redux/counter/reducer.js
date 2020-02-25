import { CounterActionTypes as AT } from "./constants";

export const counter = (state = 0, action) => {
  switch(action.type) {
    case AT.INCREMENT:
      return state + 1;
    case AT.DECREMENT:
      return state - 1;
    default:
      return state;
  }
}