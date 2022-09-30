import { post } from '../utilities';
import { ICreateCandidateRequest } from '../types';

const API_PREFIX = 'candidate';

const createCandidate = (payload: ICreateCandidateRequest) => {
  return post(`${API_PREFIX}/createCandidate`, payload);
};

export const candidateService = {
  createCandidate,
};
