import { post } from '../utilities';
import {
  ICreateCandidateTrackRequest,
  IDeleteCandidateTrackRequest,
  IGetDetailsForCandidatebyCandidateTrackIdRequest,
  ISearchCandidateTrackRequest,
  IUpdateCandidateTrackRequest,
} from '../types';

const API_PREFIX = 'CandidateTrack';

const createCandidateTrack = (payload: ICreateCandidateTrackRequest) => {
  return post(`${API_PREFIX}/createCandidateTrack`, payload);
};

const deleteCandidateTrack = (payload: IDeleteCandidateTrackRequest) => {
  return post(`${API_PREFIX}/deleteCandidateTrack`, payload);
};

const getDetailsForCandidateByCandidateTrackIds = (payload: IGetDetailsForCandidatebyCandidateTrackIdRequest) => {
  return post(`${API_PREFIX}/getDetailsForCandidateByCandidateTrackIds`, payload);
};

const searchCandidateTrack = (payload: ISearchCandidateTrackRequest) => {
  return post(`${API_PREFIX}/searchCandidateTrack`, payload);
};

const updateCandidateTrack = (payload: IUpdateCandidateTrackRequest) => {
  return post(`${API_PREFIX}/updateCandidateTrack`, payload);
};

export const candidateTrackService = {
  createCandidateTrack,
  deleteCandidateTrack,
  getDetailsForCandidateByCandidateTrackIds,
  searchCandidateTrack,
  updateCandidateTrack,
};
