import { post } from 'api';
import {
  AddHintRequest,
  AddRequest,
  AddSampleSolutionRequest,
  ExpertId,
  GetHintsRequest,
  GetQuestionDetailRequest,
  QuestionId,
  UpdateHintRequest,
  UpdateRequest,
  UpdateSampleSolutionRequest,
} from 'types';
import { API } from 'utils/constants';

const getQuestionsDetail = (payload: GetQuestionDetailRequest) => {
  return post(API.GETQUESTIONDETAIL, payload);
};

const editQuestion = (payload: UpdateRequest) => {
  return post(API.UPDATEQUESTIONDETAIL, payload);
};

const createQuestion = (payload: AddRequest) => {
  return post(API.ADDQUESTIONDETAIL, payload);
};

const createHint = (payload: AddHintRequest) => {
  return post(API.ADDHINT, payload);
};

const editHint = (payload: UpdateHintRequest) => {
  return post(API.UPDATEHINT, payload);
};

const setQuestionComplete = (payload: ExpertId & QuestionId) => {
  return post(API.SETQUESTIONCOMPLETE, payload);
};

const getAllHints = (payload: GetHintsRequest) => {
  return post(API.GETHINTS, payload);
};

const createSampleSolution = (payload: AddSampleSolutionRequest) => {
  return post(API.ADDSAMPLESOLUTION, payload);
};

const editSampleSolution = (payload: UpdateSampleSolutionRequest) => {
  return post(API.UPDATESAMPLESOLUTION, payload);
};

export const addOrEditQuestion = {
  createSampleSolution,
  setQuestionComplete,
  getQuestionsDetail,
  editSampleSolution,
  createQuestion,
  editQuestion,
  getAllHints,
  createHint,
  editHint,
};
