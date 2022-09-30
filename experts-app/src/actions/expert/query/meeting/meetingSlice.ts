import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { initialCandidateDetailFilter } from '../../../../utilities/defaults';
import { getMeetingList, completeMeeting } from './meetingActions';

interface IInitialState {
  loading: boolean;
  success: boolean;
  error: boolean;
  meetings: any[];
  markingComplete: boolean;
}

const initialState: IInitialState = {
  loading: false,
  success: false,
  error: false,
  meetings: [],
  markingComplete: false,
};
const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    resetMeeting(state) {
      state.meetings = [];
      //state.trackList = payload.tracks;
    },

    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getMeetingList.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getMeetingList.fulfilled, (state, action) => {
      state.meetings = action?.payload?.output?.meetings;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getMeetingList.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(completeMeeting.pending, (state) => {
      state.error = false;
      state.success = false;
      state.markingComplete = true;
    });
    builder.addCase(completeMeeting.fulfilled, (state, action) => {
      state.success = true;
      state.markingComplete = false;
    });
    builder.addCase(completeMeeting.rejected, (state) => {
      state.error = true;
      state.markingComplete = false;
    });
  },
});

export const {
  reset,
  resetMeeting
} = meetingSlice.actions;

export default meetingSlice.reducer;
