export const text = (increment = true) =>
  (document.querySelector('.saga').innerHTML = `<div>you chose ${
    increment ? 'increment' : 'decrement'
    }</div> <div>you get a dog </div><div>you will not get a new dog until you hit ${
    increment ? 'decrement' : 'increment'
    }</div>`);