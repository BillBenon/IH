import { post } from 'api/pppserviceApi';
import { ProductFilter } from 'types';
import { API } from 'utils/constants';

const getAllProducts = (productFilter:ProductFilter) => {
  return post(API.PPP_PRODUCT,productFilter);
};

export const products = {
    getAllProducts,
};
