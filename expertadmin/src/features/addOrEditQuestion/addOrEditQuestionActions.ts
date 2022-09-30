import { createAsyncThunk } from '@reduxjs/toolkit';
import { addOrEditQuestion } from 'api/addOrEditQuestion';
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

const {
  setQuestionComplete,
  getQuestionsDetail,
  editQuestion,
  createQuestion,
  editHint,
  createHint,
  getAllHints,
  createSampleSolution,
  editSampleSolution,
} = addOrEditQuestion;

export const getQuestionsDetails = createAsyncThunk(
  `addOrEditQuestion/getQuestionsDetails`,
  async (getQuestionRequest: GetQuestionDetailRequest) => {
    const response = await getQuestionsDetail(getQuestionRequest);
    return response;
  }
);

export const updateQuestion = createAsyncThunk(
  `addOrEditQuestion/updateQuestion`,
  async (updateRequest: UpdateRequest) => {
    const response = await editQuestion(updateRequest);
    return response;
  }
);

export const addQuestion = createAsyncThunk(
  `addOrEditQuestion/addQuestion`,
  async (addQuestion: AddRequest) => {
    const response = await createQuestion(addQuestion);
    return response;
  }
);

export const addHint = createAsyncThunk(
  `addOrEditQuestion/addHint`,
  async (data: AddHintRequest) => {
    const response = await createHint(data);
    return response;
  }
);

export const updateHint = createAsyncThunk(
  `addOrEditQuestion/updateHint`,
  async (data: UpdateHintRequest) => {
    const response = await editHint(data);
    return response;
  }
);

export const completeQuestion = createAsyncThunk(
  `addOrEditQuestion/completeQuestion`,
  async (data: ExpertId & QuestionId) => {
    const response = await setQuestionComplete(data);
    return response;
  }
);

export const getHints = createAsyncThunk(
  `addOrEditQuestion/getHints`,
  async (data: GetHintsRequest) => {
    const response = await getAllHints(data);
    return response;
  }
);

export const addSampleSolution = createAsyncThunk(
  `addOrEditQuestion/addSampleSolution`,
  async (data: AddSampleSolutionRequest) => {
    const response = await createSampleSolution(data);
    return response;
  }
);

export const updateSampleSolution = createAsyncThunk(
  `addOrEditQuestion/updateSampleSolution`,
  async (data: UpdateSampleSolutionRequest) => {
    const response = await editSampleSolution(data);
    return response;
  }
);
