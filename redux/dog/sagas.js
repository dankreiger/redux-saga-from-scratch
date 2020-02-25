import { call, take, put } from '../lib/effects';
import { api, text } from './junk';
import { fetchDogSuccess, fetchDogRequest, fetchDogFailure } from './actions';
import { DogActionTypes } from './constants';

export function* woofWatcher() {
  while (true) {
    yield take('INCREMENT');
    yield call(text, true);
    yield put(fetchDogRequest());

    yield take('DECREMENT');
    yield call(text, false);
    yield put(fetchDogRequest());
  }
}


export function* fetchWatcher() {
  while (true) {
    yield take(DogActionTypes.FETCH_DOG_REQUEST);
    try {
      const { message } = yield call(api, 'https://dog.ceo/api/breeds/image/random');
      yield put(fetchDogSuccess(message));
    } catch (err) {
      yield put(fetchDogFailure(err))
    }
  }
}
