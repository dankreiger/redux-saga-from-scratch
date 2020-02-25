export const text = (increment = true) =>
  (document.querySelector('.saga').innerHTML = `<div>you chose ${
    increment ? 'increment' : 'decrement'
    }</div> <div>you get a dog </div><div>you will not get a new dog until you hit ${
    increment ? 'decrement' : 'increment'
    }</div><div>well you could always hit the dog button if you really need a new pup</div>`);


export const api = async url => {
  const res = await fetch(url);
  const json = await res.json();
  return json;
};