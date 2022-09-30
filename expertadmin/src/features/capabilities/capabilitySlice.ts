import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Capability,
  CapabilityFilter,
  GetAllCategoriesAndSubCategoriesResponse,
  GetCapabilitiesRequest,
  PaginationFilters,
} from 'types';
import { initialCapabilityFilter } from 'utils/defaults';

import {
  getAllCapabilities,
  getCategoriesAndSubcategories,
} from './capabilityActions';

interface IInitialState {
  loading: boolean;
  success: boolean;
  error: boolean;
  capabilities: Capability[];
  totalCapabilities: number;
  categorySubcategoryList: GetAllCategoriesAndSubCategoriesResponse[];
  filterRequest: GetCapabilitiesRequest;
}

const initialState: IInitialState = {
  loading: false,
  success: false,
  error: false,
  capabilities: [],
  categorySubcategoryList: [],
  totalCapabilities: 0,
  filterRequest: initialCapabilityFilter,
};

const capabilitySlice = createSlice({
  name: 'capability',
  initialState,
  reducers: {
    setCapabilityInputFilter(
      state,
      { payload }: PayloadAction<CapabilityFilter>
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
    builder.addCase(getAllCapabilities.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getAllCapabilities.fulfilled, (state, action) => {
      state.capabilities = action.payload?.data?.output.capabilities;
      state.totalCapabilities = action.payload?.data?.output.totalCount;
      state.filterRequest.skipCount =
        state.filterRequest.skipCount >= action.payload?.data?.output.totalCount
          ? 0
          : state.filterRequest.skipCount;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getAllCapabilities.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(getCategoriesAndSubcategories.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(
      getCategoriesAndSubcategories.fulfilled,
      (state, action) => {
        state.categorySubcategoryList = action.payload?.data?.output;
        state.success = true;
        state.loading = false;
      }
    );
    builder.addCase(getCategoriesAndSubcategories.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const {
  reset,
  setPaginationFilter,
  setCapabilityInputFilter,
} = capabilitySlice.actions;

export default capabilitySlice.reducer;
