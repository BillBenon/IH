import { post } from 'api';
import { ExpertId, GetCapabilitiesRequest } from 'types';
import { API } from 'utils/constants';

const getCapabilities = (payload: GetCapabilitiesRequest) => {
  return post(API.GETALLCAPABILITIES, payload);
};

const getCategoriesAndSubcategories = (payload: ExpertId) => {
  return post(API.GETCATEGORIESANDSUBCATEGORIES, payload);
};

export const capability = {
  getCapabilities,
  getCategoriesAndSubcategories,
};
