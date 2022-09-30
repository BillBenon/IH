import { createAsyncThunk } from '@reduxjs/toolkit';
import { track } from 'api/track';
import { GetResultForTrackRequest } from 'types';

export const getAllTracks = createAsyncThunk(
  `track/getTracks`,
  async (getTrackRequest: GetResultForTrackRequest) => {
    const response = await track.getTracks(getTrackRequest);
    return response;
  }
);
