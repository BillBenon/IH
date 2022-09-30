import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCandidateDetailFilter,initialUpdateCandidatePlan } from 'utils/defaults';
import {
  Candidates,
  CandidateTrack,
  GetCandidateDetailRequest,
  UpdateCandidatePlan
} from 'types';

import {
  getCandidatesAssociatedByExpert
} from './candidatesActions';

interface IInitialState {
  loading: boolean;
  success: boolean;
  error: boolean;
  candidates: Candidates[];
  trackList: CandidateTrack[];
  upgradeCandidateTrackList: CandidateTrack[];
  detailFilterRequest: GetCandidateDetailRequest;
  candidateUpdatePlan: UpdateCandidatePlan;
}

const initialState: IInitialState = {
  loading: false,
  success: false,
  error: false,
  detailFilterRequest: initialCandidateDetailFilter,
  candidateUpdatePlan: initialUpdateCandidatePlan,
  trackList: [],
  upgradeCandidateTrackList: [],
  candidates: [],
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    getTrackList(state, { payload }: PayloadAction<Candidates>) {
      state.trackList = typeof payload != "undefined" ? payload.tracks : [];
      //state.trackList = payload.tracks;
    },
    getTrackListForUpgrade(state, { payload }: PayloadAction<Candidates>) {
      state.upgradeCandidateTrackList =
        typeof payload != "undefined" ? payload.tracks : [];
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCandidatesAssociatedByExpert.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getCandidatesAssociatedByExpert.fulfilled, (state, action) => {
      state.candidates = action.payload?.data?.output.feedbacks;
      state.trackList = [];
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getCandidatesAssociatedByExpert.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const {
  reset,
  getTrackList,
  getTrackListForUpgrade,
} = candidatesSlice.actions;

export default candidatesSlice.reducer;
