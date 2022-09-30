import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetResultForTrackRequest,
  PaginationFilters,
  Track,
  TrackFilter,
} from 'types';
import { initialTrackFilter } from 'utils/defaults';

import { getAllTracks } from './trackActions';

interface IInitialState {
  loading: boolean;
  success: boolean;
  error: boolean;
  tracks: Track[];
  totalTracks: number;
  filterRequest: GetResultForTrackRequest;
}

const initialState: IInitialState = {
  loading: false,
  success: false,
  error: false,
  tracks: [],
  totalTracks: 0,
  filterRequest: initialTrackFilter,
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTrackInputFilter(state, { payload }: PayloadAction<TrackFilter>) {
      state.filterRequest = { ...state.filterRequest, ...payload };
    },
    setPaginationFilter(state, { payload }: PayloadAction<PaginationFilters>) {

      if (payload.count != undefined) state.filterRequest.count = payload.count;
      state.filterRequest.skipCount = payload.skipCount;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTracks.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getAllTracks.fulfilled, (state, action) => {
      state.tracks = action.payload?.data?.output.tracks;
      state.totalTracks = action.payload?.data?.output.totalCount;
      state.filterRequest.skipCount =
        state.filterRequest.skipCount >= action.payload?.data?.output.totalCount
          ? 0
          : state.filterRequest.skipCount;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getAllTracks.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { setPaginationFilter, setTrackInputFilter } = trackSlice.actions;

export default trackSlice.reducer;
