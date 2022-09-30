import { post } from '../utilities';
import { ICreateQuestionAnswerRequest, ISearchQuestionAnswerRequest, IUpdateQuestionAnswerRequest } from '../types';

const API_PREFIX = 'expert';

const createQuestionAnswer = (payload: ICreateQuestionAnswerRequest) => {
  return post(`${API_PREFIX}/createQuestionAnswer`, payload);
};

const searchQuestionAnswer = (payload: ISearchQuestionAnswerRequest) => {
  return post(`${API_PREFIX}/searchQuestionAnswer`, payload);
};

const updateQuestionAnswer = (payload: IUpdateQuestionAnswerRequest) => {
  return post(`${API_PREFIX}/updateQuestionAnswer`, payload);
};

export const questionAnswerService = {
  createQuestionAnswer,
  searchQuestionAnswer,
  updateQuestionAnswer,
};
