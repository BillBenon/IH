import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { Candidates, CandidateTrack, GetCandidateDetailRequest } from '../../../../containers/Candidate/ICandidate';
import { initialCandidateDetailFilter } from '../../../../utilities/defaults';
import { getCandidatesAssociatedByExpert } from './candidateActions';

interface IInitialState {
  loading: boolean;
  success: boolean;
  error: boolean;
  meetingCandidates: Candidates[];
  feedbackCandidates: Candidates[];
  classesCandidates: Candidates[];
  trackList: CandidateTrack[];
  detailFilterRequest: GetCandidateDetailRequest;
}

const initialState: IInitialState = {
  loading: false,
  success: false,
  error: false,
  detailFilterRequest: initialCandidateDetailFilter,
  trackList: [],
  meetingCandidates: [],
  feedbackCandidates: [],
  classesCandidates: []
};
const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    getTrackList(state, { payload }: PayloadAction<Candidates>) {
      state.trackList = (typeof payload != "undefined") ? payload.tracks : [];
      //state.trackList = payload.tracks;
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
      state.meetingCandidates = action.payload?.output.meetings;
      state.feedbackCandidates = action.payload?.output.feedbacks;
      state.classesCandidates = action.payload?.output.classes;
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
  reset, getTrackList
} = candidateSlice.actions;

export default candidateSlice.reducer;
