import { createAsyncThunk } from '@reduxjs/toolkit';
import { expert } from 'api/experts';
import { GetResultsForExpertSearchReq } from 'types';

export const getAllExperts = createAsyncThunk(
  `/evaluationPlatformExpertAdmin/getResultsForExpertSearch`,
  async (getExpertRequest: GetResultsForExpertSearchReq) => {
    const response = await expert.getExperts(getExpertRequest);
    return response;
  }
);