import { EventEmitter } from 'events'

let actionsEmitter = new EventEmitter();
// what strange hacking this is
export async function runPuppy(store, saga, ...args) {
  try {
    const it = saga(...args);
    let result = it.next();
    while (!result.done) {
      const effect = result.value;
      switch (effect.type) {
        case 'take':
          const action = await new Promise(
            // this is the magic helping me too much
            resolve => actionsEmitter.once(effect.actionType, resolve)
          )
          result = it.next(action);
          break
        case 'call':
          if (effect.fn.constructor.name === 'GeneratorFunction') {
            // here if we are calling another generator 
            // this will be blocking just the like real redux saga call helper
            result = await runPuppy(store, effect.fn);
            result = it.next(result);
          } else {
            result = it.next(await effect.fn(...effect.args))
          }
          break
        case 'put':
          store.dispatch(effect.action);
          result = it.next();
          break
        case 'fork':
          runPuppy(store, effect.saga, ...effect.args)
          result = it.next()
          break
        default:
          throw new Error(`Invalid effect type: ${effect.type}`)
      }
    }
  } catch (err) {
    console.error('Uncaught in runPuppy', err)
  }
}

function puppyMiddleware() {
  let store;
  function innerPuppy(_store) {
    store = _store
    return next => action => {
      actionsEmitter.emit(action.type, action)
      return next(action);
    }
  }

  innerPuppy.run = saga => {
    runPuppy(store, saga)
  };
  return innerPuppy;
}


export default puppyMiddleware;