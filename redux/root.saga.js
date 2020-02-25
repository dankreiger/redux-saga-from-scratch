import { fork } from './lib/effects'
import { woofWatcher, fetchWatcher } from './dog/sagas';

export function* rootSaga() {
  yield fork(fetchWatcher);
  yield fork(woofWatcher);
}

