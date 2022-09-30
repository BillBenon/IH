import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setValueBrowserStorage } from 'services/browserStorageService';
import { authService } from '../../services/auth';

interface IData {
  email: string;
  password: string;
}

interface IInitialState {
  user: any;
  loading: boolean;
  error: string | null | undefined;
}

export const loginAction = createAsyncThunk('auth/login', async (data: IData) => {
  const response = await authService.login(data.email, data.password);
  return response;
});

export const signupAction = createAsyncThunk('auth/signup', async (data) => {
  const response = await authService.signup(data);
  return response;
});

const initialState: IInitialState = { user: authService.getAuthFromStorage(), loading: false, error: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      authService.removeAuthFromStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      state.user = null;
      state.error = null;
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      const user = action.payload;
      setValueBrowserStorage('auth', JSON.stringify(user));
      authService.setAuthInStorage(user);
      state.user = user;
      state.loading = false;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
