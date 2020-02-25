
export const take = actionType => ({ type: 'take', actionType })
export const put = action => ({ type: 'put', action });
export const call = (fn, ...args) => ({ type: 'call', fn, args });
export const fork = (saga, ...args) => ({ type: 'fork', saga, args })
