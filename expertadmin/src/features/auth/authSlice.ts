import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expert } from 'types';
import BrowserStorage from 'utils/broswer-storage';

import { login } from './authActions';

interface IInitialState {
  loading: boolean;
  success: boolean;
  error: boolean;
  expert: Expert | undefined;
}

const initialState: IInitialState = {
  loading: false,
  success: false,
  error: false,
  expert: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setExpert(state, { payload }: PayloadAction<Expert | undefined>) {
      if (!payload) BrowserStorage.removeItem('expertadmin');
      state.expert = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.expert = action.payload?.data?.output;
      BrowserStorage.setItem('expertadmin', state.expert);
      state.success = true;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const { setExpert } = authSlice.actions;

export default authSlice.reducer;
