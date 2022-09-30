import { post } from 'api';
import { GetResultForQuestionRequest } from 'types';
import { API } from 'utils/constants';

const getQuestions = (payload: GetResultForQuestionRequest) => {
  return post(API.GETQUESTION, payload);
};

export const question = {
  getQuestions,
};
