import { call } from './lib/effects'
import { woofWatcher } from './dog/sagas';

export function* rootSaga() {
  yield call(woofWatcher);
}

