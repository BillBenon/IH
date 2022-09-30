import { createAsyncThunk } from '@reduxjs/toolkit';
import { capability } from 'api/capability';
import { ExpertId, GetCapabilitiesRequest } from 'types';

export const getAllCapabilities = createAsyncThunk(
  `capability/getCapabilities`,
  async (getCapabilityRequest: GetCapabilitiesRequest) => {
    const response = await capability.getCapabilities(getCapabilityRequest);
    return response;
  }
);

export const getCategoriesAndSubcategories = createAsyncThunk(
  `capability/getCategoriesAndSubcategories`,
  async (getCategoriesRequest: ExpertId) => {
    const response = await capability.getCategoriesAndSubcategories(
      getCategoriesRequest
    );
    return response;
  }
);
