import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import {
  ExpertTree,
  GetExpertResponse,
  Review,
} from 'types';
import { State } from 'utils/constants';
import { initialExpert } from 'utils/defaults';

import {
  addExpert,
  getExpertDetails,
  updateExpert
} from './addOrEditExpertActions';

interface IInitialState {
  error: boolean;
  success: boolean;
  loading: boolean;
  expertSuccess: boolean;
  expert: GetExpertResponse;
  saveSuccess: boolean;
  selectedExpert: string;
  openAddEditExpert: boolean;
  expertDetail?: any;
  expertOverviewTree?: ExpertTree;
}

const initialState: IInitialState = {
  error: false,
  success: false,
  expertSuccess: false,
  loading: false,
  expert: initialExpert,
  saveSuccess: false,
  selectedExpert: '',
  openAddEditExpert: false,
};

const addOrEditExpertSlice = createSlice({
  name: 'addOrEditExpert',
  initialState,
  reducers: {
    setInitialExpert(state, { payload }: PayloadAction<GetExpertResponse | undefined>) {
      if (payload) state.expert = payload;
      else state.expert = initialExpert;
    },
    setExpertState(state, { payload }: PayloadAction<string>) {
      state.expert.state = payload;
      if (payload != State.DISABLED) {
        state.expert.disabled = false;
        state.expert.disableReason = '';
      }
    },
    updateSelectedExpert(state, { payload }: PayloadAction<string>) {
      state.selectedExpert = payload;
    },
    handleOpenAddEditExpert(state, { payload }: PayloadAction<boolean>) {
      state.openAddEditExpert = payload;
    },
    updateExpertOverview(
      state,
      { payload }: PayloadAction<ExpertTree | undefined>
    ) {
      state.expertOverviewTree = payload;
    },
    setExpertSuccess(state) {
      state.expertSuccess = false;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getExpertDetails.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getExpertDetails.fulfilled, (state, action) => {
      state.expert = action.payload?.data?.output;
      if (state.expert) {
        state.expert?.reviews?.forEach((rev: Review) => {
          rev.date = moment(rev.date, 'MM/DD/YYYY').format('YYYY-MM-DD')
        })
        if (state.expert.disabled) state.expert.state = State.DISABLED;
      }
      state.selectedExpert = state.expert.expertId;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getExpertDetails.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(updateExpert.pending, (state) => {
      state.error = false;
      state.saveSuccess = false;
      state.loading = true;
      if (state.expert?.disabled) state.expert.state = State.DISABLED;
    });
    builder.addCase(updateExpert.fulfilled, (state, action) => {
      if (action.payload) {
        state.saveSuccess = true;
      }
      state.loading = false;
    });
    builder.addCase(updateExpert.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(addExpert.pending, (state) => {
      state.error = false;
      state.saveSuccess = false;
      state.loading = true;
    });
    builder.addCase(addExpert.fulfilled, (state, action) => {
      if (action.payload) {
        state.expert.expertId =
          action.payload?.data?.output?.expertId;
        state.saveSuccess = true;
      }
      state.loading = false;
    });
    builder.addCase(addExpert.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const {
  reset,
  setExpertSuccess,
  setExpertState,
  setInitialExpert,
  updateSelectedExpert,
  handleOpenAddEditExpert,
  updateExpertOverview,
} = addOrEditExpertSlice.actions;

export default addOrEditExpertSlice.reducer;
