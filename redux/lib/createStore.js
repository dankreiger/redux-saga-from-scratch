// normally we accept preloaded state as the second arguement
// and an enhancer as the third argument
// but for the purpose of this exercise we only need a reducer

export const createStore = (reducer, preloadedState, enhancer) => {
  if (typeof enhancer !== 'undefined') {
    return enhancer(createStore)(reducer, preloadedState);
  }
  let currentState = preloadedState;
  let listeners = [];

  const getState = () => currentState;

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }

  const dispatch = action => {
    currentState = reducer(currentState, action);
    listeners.forEach(l => l());
  }


  // initialize state
  dispatch({});

  return { getState, subscribe, dispatch }
}