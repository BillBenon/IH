import { post } from '../utilities';
import { IGetEnumsRequest } from '../types';

const API_PREFIX = 'metadata';

const getEnums = (payload: IGetEnumsRequest) => {
  return post(`${API_PREFIX}/createExpert`, payload);
};

export const metadataService = {
  getEnums,
};
