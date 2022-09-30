import { createAsyncThunk } from '@reduxjs/toolkit';
import { CreateHiringManager } from 'types/CreateHiringManager';
import { IChangePassword } from '../../containers/ChangePassword/IChangePassword';
import { ExpertDetail, LastActivity } from '../../containers/Login/ILogin';
import { authService } from '../../services/auth';
import { ExpertRequestLogin } from '../../types/ExpertLoginRequest';

export const loginAction = createAsyncThunk(
  `auth/loginAction`,
  async (authInfo: ExpertRequestLogin) => {
    const response = await authService.login(authInfo);
    return response;
  }
);

export const signupAction = createAsyncThunk(
  `auth/signupAction`,
  async (authInfo: CreateHiringManager) => {
    const response = await authService.signup(authInfo);
    return response;
  }
);

export const saveLastActivity = createAsyncThunk(
  `auth/saveLastActivity`,
  async (data: LastActivity) => {
    const response = await authService.saveLastActivity(data);
    return response;
  }
);

export const changePassword = createAsyncThunk(
  `auth/changePassword`,
  async (data: IChangePassword) => {
    const response = await authService.changePassword(data);
    return response;
  }
);

export const getExpertDetails = createAsyncThunk(
  `auth/getExpertDetails`,
  async (expertId: string) => {
    const response = await authService.getExpertDetails(expertId);
    return response;
  }
)

export const updateExpert = createAsyncThunk(
  `auth/updateExpert`,
  async (payload: ExpertDetail) => {
    const response = await authService.updateExpert(payload);
    return response;
  }
)