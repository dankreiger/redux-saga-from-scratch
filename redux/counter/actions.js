import { CounterActionTypes as AT } from './constants';

export const increment = () => ({
  type: AT.INCREMENT
});

export const decrement = () => ({
  type: AT.DECREMENT
});

