import { createAsyncThunk } from '@reduxjs/toolkit';
import { trackSettings } from 'api/trackSettings';
import { ExpertId, GetResultForTrackSettingsRequest, TrackId, UpdateTrackLandingPage, RefreshInput } from 'types';

export const getAllTracks = createAsyncThunk(
  `trackSettings/getAllTracks`,
  async (getTrackRequest: GetResultForTrackSettingsRequest) => {
    const response = await trackSettings.getTracks(getTrackRequest);
    return response;
  }
);

export const getTracksForComboBox = createAsyncThunk(
  `trackSettings/getTracksForCombobox`,
  async (payload: ExpertId) => {
    const response = await trackSettings.getTracksForCombobox(payload);
    return response;
  }
);

export const createTrackLandingPageDetail = createAsyncThunk(
  `trackSettings/createTrackLandingPageDetail`,
  async (payload: ExpertId & TrackId) => {
    const response = await trackSettings.createTrackLandingPageDetail(payload);
    return response;
  }
);

export const updateTrackLandingPageDetail = createAsyncThunk(
  `trackSettings/updateTrackLandingPageDetail`,
  async (payload: UpdateTrackLandingPage) => {
    const response = await trackSettings.updateTrackLandingPageDetail(payload);
    return response;
  }
);

export const getTrackLandingPageDetails = createAsyncThunk(
  `trackSettings/getTrackLandingPageDetails`,
  async (payload: ExpertId & TrackId) => {
    const response = await trackSettings.getTrackLandingPageDetails(payload);
    return response;
  }
);

export const refreshDataFromTrackAndProduct = createAsyncThunk(
  `trackSettings/refreshDataFromTrackAndProduct`,
  async (payload: RefreshInput) => {
    const response = await trackSettings.refreshDataFromTrackAndProduct(payload);
    return response;
  }
);
