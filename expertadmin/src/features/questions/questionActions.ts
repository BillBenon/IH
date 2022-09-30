import { createAsyncThunk } from '@reduxjs/toolkit';
import { question } from 'api/question';
import { GetResultForQuestionRequest } from 'types';

export const getQuestions = createAsyncThunk(
  `question/getQuestions`,
  async (getQuestionRequest: GetResultForQuestionRequest) => {
    const response = await question.getQuestions(getQuestionRequest);
    return response;
  }
);
