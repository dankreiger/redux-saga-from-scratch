import { fork } from './lib/effects'
import { woofWatcher, fetchWatcher } from './dog/sagas';

// haven't figured out how to make the all effect yet...
export function* rootSaga() {
  yield fork(fetchWatcher);
  yield fork(woofWatcher);
}

