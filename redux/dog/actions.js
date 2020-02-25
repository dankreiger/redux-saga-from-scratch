
import { DogActionTypes as AT } from './constants';

export const fetchDogRequest = () => ({
  type: AT.FETCH_DOG_REQUEST
});

export const fetchDogSuccess = payload => ({
  type: AT.FETCH_DOG_SUCCESS,
  payload
});

export const fetchDogFailure = payload => ({
  type: AT.FETCH_DOG_FAILURE,
  payload
});
