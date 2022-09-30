import { get, post } from '../utilities';
import {
  ICreateQuestionRequest,
  IDeleteQuestionRequest,
  IGetQuestionsRequest,
  ISearchQuestionRequest,
  IUpdateQuestionRequest,
} from '../types';

const API_PREFIX = 'question';

const createQuestion = (payload: ICreateQuestionRequest) => {
  return post(`${API_PREFIX}/createQuestion`, payload);
};

const deleteQuestion = (payload: IDeleteQuestionRequest) => {
  return post(`${API_PREFIX}/deleteQuestion`, payload);
};

const getQuestions = (payload: IGetQuestionsRequest) => {
  return post(`${API_PREFIX}/getQuestions`, payload);
};

const getQuestionsByCapabilityId = () => {
  return get(`${API_PREFIX}/getQuestionsByCapabilityId`);
};

const getQuestionsDetailByCapabilityId = () => {
  return get(`${API_PREFIX}/getQuestionsDetailByCapabilityId`);
};

const searchQuestion = (payload: ISearchQuestionRequest) => {
  return post(`${API_PREFIX}/searchQuestion`, payload);
};

const updateQuestion = (payload: IUpdateQuestionRequest) => {
  return post(`${API_PREFIX}/updateQuestion`, payload);
};

export const questionService = {
  createQuestion,
  deleteQuestion,
  getQuestions,
  getQuestionsByCapabilityId,
  getQuestionsDetailByCapabilityId,
  searchQuestion,
  updateQuestion,
};
