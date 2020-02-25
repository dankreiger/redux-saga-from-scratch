import fetch from 'node-fetch';
import { call, take, put } from '../lib/effects';
import { text } from './junk';
import {  fetchDogSuccess, fetchDogRequest } from './actions';
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

const api = async url => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};
export function* fetchWatcher() {
  while (true) {
    yield take(DogActionTypes.FETCH_DOG_REQUEST);
    const { message } = yield call(api, 'https://dog.ceo/api/breeds/image/random');
    yield put(fetchDogSuccess(message));
  }
}
