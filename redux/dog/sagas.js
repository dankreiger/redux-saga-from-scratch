import { put, take, call } from '../lib/effects';

export function* woofWatcher() {
  while(true) {
    yield take('INCREMENT');
    console.log('cool, increment');
  }
}
