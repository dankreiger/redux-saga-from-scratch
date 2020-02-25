import { DogActionTypes as AT } from "./constants";

export const dog = (state = { image: '' }, action) => {
  switch (action.type) {
    case AT.FETCH_DOG_REQUEST:
      return {
        ...state,
        loading: true
      }
    case AT.FETCH_DOG_SUCCESS:
      return {
        ...state,
        loading: false,
        image: action.payload
      }
    case AT.FETCH_DOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}