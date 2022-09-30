import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ExpertDetail } from '../../containers/Login/ILogin';
import BrowserCacheService from '../../services/browser-cache';
import { DefaultToastSettings, InitialActivity } from '../../utilities/defaults';
import { changePassword, getExpertDetails, loginAction, signupAction, saveLastActivity, updateExpert } from './authActions';

interface IInitialState {
  user: ExpertDetail;
  expertProfile?: ExpertDetail | undefined;
  loading: boolean;
  success: string | null | undefined;
  error: string | null | undefined;
  loadingProfile: boolean;
}

const initialState: IInitialState = {
  user: `${BrowserCacheService.getItem("auth", (value: any) => {
    return value;
  })}` as any,
  loading: false,
  success: null,
  error: null,
  loadingProfile: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setExpert(state, { payload }) {
      state.user = payload;
    },
    logout(state) {
      BrowserCacheService.removeItem("auth");
      state.user = initialState.user;
    },
    updateQuery(state, { payload }) {
      if (state.user) {
        state.user.lastActivity.saveQueries[payload.index].count = payload.value.count;
        state.user.lastActivity.saveQueries[payload.index].skipCount = payload.value.skipCount;
        state.user.lastActivity.saveQueries[payload.index].fixedQuery = payload.value.fixedQuery;
        if (state.user.lastActivity.saveQueries[payload.index]) state.user.lastActivity.saveQueries[payload.index].query = payload.value.query;
        BrowserCacheService.setItem("auth", JSON.parse(JSON.stringify(state.user)));
      }
    },
    updateSkipCount(state, { payload }) {
      if (state.user) {
        state.user.lastActivity.saveQueries[payload.index].skipCount = payload.skipCount;
        BrowserCacheService.setItem("auth", JSON.parse(JSON.stringify(state.user)));
      }
    },
    addNewQuery(state, { payload }) {
      if (state.user) {
        if (state.user.lastActivity.saveQueries[state.user.lastActivity.saveQueries.length - 1]) {
          state.user.lastActivity.saveQueries.push({ ...payload.query, tabOrder: +(state.user.lastActivity.saveQueries[state.user.lastActivity.saveQueries.length - 1].tabOrder) + 1 });
          BrowserCacheService.setItem("auth", JSON.parse(JSON.stringify(state.user)));
        }
      }
    },
    deleteQuery(state, { payload }) {
      if (state.user) {
        state.user.lastActivity.saveQueries.splice(payload.index, 1)
        BrowserCacheService.setItem("auth", JSON.parse(JSON.stringify(state.user)));
      }
    },
    setSuccess(state) {
      state.success = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.success = action.payload.apiMessage;
      let expert = { ...action.payload.output };
      if (!expert.lastActivity?.level1) expert.lastActivity = InitialActivity;
      BrowserCacheService.setItem("auth", expert);
      state.user = expert;
      state.loading = false;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      toast.error(action.error.message, DefaultToastSettings);
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(signupAction.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(signupAction.fulfilled, (state, action) => {
      state.success = action.payload.apiMessage;
      let expert = { ...action.payload.output };
      if (!expert.lastActivity?.level1) expert.lastActivity = InitialActivity;
      BrowserCacheService.setItem("auth", expert);
      state.user = expert;
      state.loading = false;
    });
    builder.addCase(signupAction.rejected, (state, action) => {
      toast.error(action.error.message, DefaultToastSettings);
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(saveLastActivity.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(saveLastActivity.fulfilled, (state, action) => {
      state.success = action.payload.apiMessage;
      state.loading = false;
      BrowserCacheService.setItem("auth", JSON.parse(JSON.stringify(state.user)));
    });
    builder.addCase(saveLastActivity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(changePassword.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      toast.success(action.payload.apiMessage, DefaultToastSettings);
      state.success = action.payload.apiMessage;
      state.loading = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      toast.error(action.error.message, DefaultToastSettings);
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(getExpertDetails.pending, (state, action) => {
      state.error = null;
      state.loadingProfile = true;
    });
    builder.addCase(getExpertDetails.fulfilled, (state, action) => {
      state.loadingProfile = false;
      state.expertProfile = action.payload.output;
    });
    builder.addCase(getExpertDetails.rejected, (state, action) => {
      toast.error(action.error.message, DefaultToastSettings);
      state.error = action.error.message;
      state.loadingProfile = false;
    });
    builder.addCase(updateExpert.pending, (state, action) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(updateExpert.fulfilled, (state, action) => {
      state.loading = false;
      toast.success(action.payload.apiMessage, DefaultToastSettings);
      state.success = action.payload.apiMessage;
    });
    builder.addCase(updateExpert.rejected, (state, action) => {
      toast.error(action.error.message, DefaultToastSettings);
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const {
  logout,
  setExpert,
  setSuccess,
  addNewQuery,
  deleteQuery,
  updateQuery,
  updateSkipCount } = authSlice.actions;

export default authSlice.reducer;
