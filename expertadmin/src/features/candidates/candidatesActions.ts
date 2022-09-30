import { createAsyncThunk } from '@reduxjs/toolkit';
import { candidates } from 'api/candidates';
import { GetCandidateRequest, UpdateCandidatePlan } from 'types';

export const getCandidatesAssociatedByExpert = createAsyncThunk(
  `candidates/getCandidates`,
  async (getCategoriesRequest: GetCandidateRequest) => {
    const response = await candidates.getCandidatesAssociatedByExpert(
      getCategoriesRequest
    );
    return response;
  }
);

export const getUpdateCandidatePlan = createAsyncThunk(
  `candidates/updateCandidatePlan`,
  async (getCandidatePlanRequest: UpdateCandidatePlan) => {
    const response = await candidates.getUpdateCandidatePlan(
      getCandidatePlanRequest
    );
    return response;
  }
)
