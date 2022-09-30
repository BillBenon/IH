import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecentItem } from 'types';

interface IInitialState {
  success: boolean;
  error: boolean;
  recentItems: any;
}

const initialState: IInitialState = {
  success: false,
  error: false,
  recentItems: {},
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setRecentItem(state, { payload }: PayloadAction<RecentItem>) {
      state.recentItems = { ...state.recentItems, payload };
    },
  },
});

export const { setRecentItem } = homeSlice.actions;

export default homeSlice.reducer;
