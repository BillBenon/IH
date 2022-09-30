import { post } from '../utilities';
import { ICreateTrackRequest, IDeleteTrackRequest, ISearchTrackRequest, IUpdateTrackRequest } from '../types';

const API_PREFIX = 'track';

const createTrack = (payload: ICreateTrackRequest) => {
  return post(`${API_PREFIX}/createTrack`, payload);
};

const deleteTrack = (payload: IDeleteTrackRequest) => {
  return post(`${API_PREFIX}/deleteTrack`, payload);
};

const searchTrack = (payload: ISearchTrackRequest) => {
  return post(`${API_PREFIX}/searchTrack`, payload);
};

const updateTrack = (payload: IUpdateTrackRequest) => {
  return post(`${API_PREFIX}/updateTrack`, payload);
};

export const trackService = {
  createTrack,
  deleteTrack,
  searchTrack,
  updateTrack,
};
