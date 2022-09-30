import { post } from '../utilities';
import { ICreateFeedbackRequest, IGetFeedbackRequest, IUpdateFeedbackRequest } from '../types';

const API_PREFIX = 'expert';

const createFeedback = (payload: ICreateFeedbackRequest) => {
  return post(`${API_PREFIX}/createFeedback`, payload);
};

const getFeedback = (payload: IGetFeedbackRequest) => {
  return post(`${API_PREFIX}/getFeedback`, payload);
};

const updateFeedback = (payload: IUpdateFeedbackRequest) => {
  return post(`${API_PREFIX}/updateFeedback`, payload);
};

export const feedbackService = {
  createFeedback,
  getFeedback,
  updateFeedback,
};
