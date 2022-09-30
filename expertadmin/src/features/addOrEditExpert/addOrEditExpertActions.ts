import { createAsyncThunk } from '@reduxjs/toolkit';
import { addOrEditExpert } from 'api/addOrEditExpert';
import {
  GetExpertDetailRequest,
  UpdateExpertRequest,
  CreateExpertRequest,
} from 'types';

const {
  getExpertDetail,
  editExpert,
  createExpert,
} = addOrEditExpert

export const getExpertDetails = createAsyncThunk(
  `addOrEditExpert/getExpertDetail`,
  async (payload: GetExpertDetailRequest) => {
    const response = await getExpertDetail(payload);
    return response;
  }
);

export const updateExpert = createAsyncThunk(
  `addOrEditExpert/updateExpert`,
  async (payload: UpdateExpertRequest) => {
    const response = await editExpert(payload);
    return response;
  }
);

export const addExpert = createAsyncThunk(
  `addOrEditExpert/addExpert`,
  async (payload: CreateExpertRequest) => {
    const response = await createExpert(payload);
    return response;
  }
);