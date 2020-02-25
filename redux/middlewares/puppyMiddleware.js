import { EventEmitter } from 'events'

let actionsEmitter = new EventEmitter();
export async function runSaga(store, saga, ...args) {
  try {
    const it = saga(...args);
    let result = it.next();
    while (!result.done) {
      const effect = result.value;
      switch (effect.type) {
        case 'take':
          const action = await new Promise(
            resolve => actionsEmitter.once(effect.actionType, resolve)
          )
          result = it.next(action);
          break
        case 'call':
          if(effect.fn.constructor.name === 'GeneratorFunction') {
            result = await runSaga(store, effect.fn); // blocking
            result = it.next(result);
          } else {
            result = it.next(await effect.fn(...effect.args))
          }
          break
        case 'put':
          store.dispatch(effect.action);
          result = it.next();
          break

        default:
          throw new Error(`Invalid effect type: ${effect.type}`)
      }
    }
  } catch (err) {
    console.error('Uncaught in runSaga', err)
  }
}

function puppyMiddleware() {
  let store;

  function innerPuppy(s) {
      store = s
      return next => action => {
        actionsEmitter.emit(action.type, action)
        // // 1. if the action is a function, we want to call the action with dispatch and getState 
        // // 2. in all cases we want to call "next" on the action to send it down the middleware chain
        return next(action);
      }
  }

  innerPuppy.run = saga => {
    runSaga(store, saga)
  };
  return innerPuppy;
}


export default puppyMiddleware;