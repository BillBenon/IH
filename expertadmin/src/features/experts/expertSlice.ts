import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetResultsForExpertSearchReq, PaginationFilters, TrackExpert } from 'types';
import { initialExpertFilter } from 'utils/defaults';

import { getAllExperts } from './expertActions';

interface IInitialState {
  loading: boolean;
  success: boolean;
  error: boolean;
  experts: TrackExpert[];
  totalExperts: number;
  filterRequest: GetResultsForExpertSearchReq;
}

const initialState: IInitialState = {
  loading: false,
  success: false,
  error: false,
  experts: [],
  totalExperts: 0,
  filterRequest: initialExpertFilter,
};

const expertSlice = createSlice({
  name: 'expert',
  initialState,
  reducers: {
    setexpertInputFilter(
      state,
      { payload }
    ) {
      state.filterRequest = { ...state.filterRequest, ...payload };
    },
    setPaginationFilter(state, { payload }: PayloadAction<PaginationFilters>) {
      if (payload.count != undefined) state.filterRequest.count = payload.count;
      state.filterRequest.skipCount = payload.skipCount;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllExperts.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getAllExperts.fulfilled, (state, action) => {
      state.experts = action.payload?.data.output.experts;
      state.totalExperts = action.payload?.data?.output.totalCount;
      state.filterRequest.skipCount =
        state.filterRequest.skipCount >= action.payload?.data?.output.totalCount
          ? 0
          : state.filterRequest.skipCount;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getAllExperts.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const {
  reset,
  setPaginationFilter,
  setexpertInputFilter,
} = expertSlice.actions;

export default expertSlice.reducer;
