import 'regenerator-runtime/runtime';

import {
  store
} from './redux/store';
import {
  increment,
  decrement
} from './redux/counter/actions';
import { fetchDog } from './redux/dog/actions';

const {
  getState,
  subscribe,
  dispatch
} = store;

let memoImg;
const renderDog = () => {
  const { loading, image } = getState().dog;
  if (!loading && memoImg === image) {
    return;
  }
  memoImg = image;
  const app = document.getElementById('dog');
  if (loading) {
    app.innerHTML = `<div class="lds-hourglass"></div>`;
    return
  }
  app.innerHTML = `<img src="${image}" /></div>`;
}

const renderCounter = () => {
  const app = document.getElementById('counter');
  app.innerHTML = `<h1>${getState().counter}</h1>`;
};

const renderDogSubscription = subscribe(renderDog);
// Note - you can unsubscribe by calling: renderDogSubscription()
renderDog();


const renderCounterSubscription = subscribe(renderCounter);
// Note - you can unsubscribe by calling: renderCounterSubscription()
renderCounter();

/**
 * @description
 * click listeners that dispatch actions to the store
 */
const i = document.querySelector('.increment');
const d = document.querySelector('.decrement');
const f = document.querySelector('.fetchDog');
i.addEventListener('click', () => {
  dispatch(increment());
});

d.addEventListener('click', () => {
  dispatch(decrement());
});

f.addEventListener('click', () => {
  dispatch(fetchDog());
});

