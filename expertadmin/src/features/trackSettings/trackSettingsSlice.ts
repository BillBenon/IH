import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetResultForTrackSettingsRequest, PaginationFilters, Track, TrackSettingsFilter, UpdateTrackLandingPage } from 'types';
import { initialTrackSettingsFilter } from 'utils/defaults';

import {
  createTrackLandingPageDetail,
  getAllTracks,
  getTrackLandingPageDetails,
  getTracksForComboBox,
  updateTrackLandingPageDetail,
  refreshDataFromTrackAndProduct,
} from './trackSettingsActions';

interface IInitialState {
  loading: boolean;
  success: boolean;
  error: boolean;
  tracks: Track[];
  totalTracks: number;
  filterRequest: GetResultForTrackSettingsRequest;
  tracksForCombobox?: { trackId: string, title: string }[];
  trackLandingPageDetails?: UpdateTrackLandingPage;
  refershTrackPageDetails?: UpdateTrackLandingPage;
}

const initialState: IInitialState = {
  loading: false,
  success: false,
  error: false,
  tracks: [],
  totalTracks: 0,
  filterRequest: initialTrackSettingsFilter,
};

const trackSettingsSlice = createSlice({
  name: 'trackSettings',
  initialState,
  reducers: {
    setTrackInputFilter(state, { payload }: PayloadAction<TrackSettingsFilter>) {
      state.filterRequest = { ...state.filterRequest, ...payload };
    },
    setPaginationFilter(state, { payload }: PayloadAction<PaginationFilters>) {
      if (payload.count != undefined) state.filterRequest.count = payload.count;
      state.filterRequest.skipCount = payload.skipCount;
    },
    setTrackLandingPagedetails(state, { payload }: PayloadAction<UpdateTrackLandingPage | undefined>) {
      state.trackLandingPageDetails = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTracks.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getAllTracks.fulfilled, (state, action) => {
      state.tracks = action.payload?.data?.output.trackLandingPageList;
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
    builder.addCase(getTracksForComboBox.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getTracksForComboBox.fulfilled, (state, action) => {
      state.tracksForCombobox = action.payload?.data?.output.tracks;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getTracksForComboBox.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(createTrackLandingPageDetail.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(createTrackLandingPageDetail.fulfilled, (state, action) => {
      state.trackLandingPageDetails = action.payload?.data?.output;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(createTrackLandingPageDetail.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(updateTrackLandingPageDetail.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(updateTrackLandingPageDetail.fulfilled, (state, action) => {
      state.trackLandingPageDetails = action.payload?.data?.output;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(updateTrackLandingPageDetail.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(getTrackLandingPageDetails.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getTrackLandingPageDetails.fulfilled, (state, action) => {
      state.trackLandingPageDetails = action.payload?.data?.output;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getTrackLandingPageDetails.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(refreshDataFromTrackAndProduct.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(refreshDataFromTrackAndProduct.fulfilled, (state, action) => {
      state.refershTrackPageDetails = action.payload?.data?.output;
      state.trackLandingPageDetails = action.payload?.data?.output;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(refreshDataFromTrackAndProduct.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { setPaginationFilter, setTrackInputFilter, setTrackLandingPagedetails } = trackSettingsSlice.actions;

export default trackSettingsSlice.reducer;
