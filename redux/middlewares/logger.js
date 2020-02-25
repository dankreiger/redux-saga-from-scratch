const logger = store => next => action => {
  if (typeof action === 'object') {
    console.log('dispatching', action);
  }
  let result = next(action);
  if (typeof action === 'function') {
    console.log('thunk called');
  } else {
    console.log('next state', store.getState());
  }
  return result;
};

export default logger;
