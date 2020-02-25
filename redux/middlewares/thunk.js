// middleware contract
// return ({ dispatch, getState }) => next => action => {...}

function createThunkMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    // write thunk middleware
    if(typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  }

}

const thunk = createThunkMiddleware();
export default thunk;