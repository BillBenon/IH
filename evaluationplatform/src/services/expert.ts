import { post } from '../utilities';
import { ICreateExpertRequest, IDeleteExpertRequest, ISearchExpertRequest, IUpdateExpertRequest } from '../types';

const API_PREFIX = 'expert';

const createExpert = (payload: ICreateExpertRequest) => {
  return post(`${API_PREFIX}/createExpert`, payload);
};

const deleteExpert = (payload: IDeleteExpertRequest) => {
  return post(`${API_PREFIX}/deleteExpert`, payload);
};

const searchExpert = (payload: ISearchExpertRequest) => {
  return post(`${API_PREFIX}/searchExpert`, payload);
};

const updateExpert = (payload: IUpdateExpertRequest) => {
  return post(`${API_PREFIX}/updateExpert`, payload);
};

export const expertService = {
  createExpert,
  deleteExpert,
  searchExpert,
  updateExpert,
};
