import { post } from 'api';
import { LoginRequest, SetEntityStateRequest } from 'types';
import { API } from 'utils/constants';

const login = (payload: LoginRequest) => {
  return post(API.LOGIN, payload);
};

const setEntityState = (payload: SetEntityStateRequest) => {
  return post(API.SETENTITYSTATE, payload);
};

export const auth = {
  login,
  setEntityState,
};
