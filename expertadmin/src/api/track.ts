import { post } from 'api';
import { GetResultForTrackRequest } from 'types';
import { API } from 'utils/constants';

const getTracks = (payload: GetResultForTrackRequest) => {
  return post(API.GETALLTRACKS, payload);
};

export const track = {
  getTracks,
};
