import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from 'api/auth';
import { LoginRequest, SetEntityStateRequest } from 'types';

export const login = createAsyncThunk(
  `auth/login`,
  async (authInfo: LoginRequest) => {
    const response = await auth.login(authInfo);
    return response;
  }
);

export const setEntityState = createAsyncThunk(
  `auth/setEntityState`,
  async (data: SetEntityStateRequest) => {
    const response = await auth.setEntityState(data);
    return response;
  }
);
