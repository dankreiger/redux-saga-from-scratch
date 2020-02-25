// middleware contract
// return ({ dispatch, getState }) => next => action => {...}

function createThunkMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    // write thunk middleware

    // // hint: 
    // // 1. if the action is a function, we want to call the action with dispatch and getState 
    // // 2. in all cases we want to call "next" on the action to send it down the middleware chain
    return next(action);
  }

}

const thunk = createThunkMiddleware();
export default thunk;