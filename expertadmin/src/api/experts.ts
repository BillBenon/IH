import { post } from 'api';
import { GetResultsForExpertSearchReq } from 'types';
import { API } from 'utils/constants';

const getExperts = (payload: GetResultsForExpertSearchReq) => {
  return post(API.GetResultsForExpertSearch, payload);
};

export const expert = {
    getExperts,
};
