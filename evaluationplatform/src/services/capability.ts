import { post } from '../utilities';
import {
  ICreateCapabilityRequest,
  IDeleteCapabilityRequest,
  ISearchCapabilityRequest,
  IUpdateCapabilityRequest,
} from '../types';

const API_PREFIX = 'capability';

const createCapability = (payload: ICreateCapabilityRequest) => {
  return post(`${API_PREFIX}/createCapability`, payload);
};

const deleteCapability = (payload: IDeleteCapabilityRequest) => {
  return post(`${API_PREFIX}/deleteCapability`, payload);
};

const searchCapability = (payload: ISearchCapabilityRequest) => {
  return post(`${API_PREFIX}/searchCapability`, payload);
};

const updateCapability = (payload: IUpdateCapabilityRequest) => {
  return post(`${API_PREFIX}/updateCapability`, payload);
};

export const capabilityService = {
  createCapability,
  deleteCapability,
  searchCapability,
  updateCapability,
};
