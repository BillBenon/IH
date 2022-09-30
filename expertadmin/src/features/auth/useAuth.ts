import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { useSelector } from 'react-redux';
import { LoginRequest } from 'types';

import { login } from './authActions';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const handleLogin = (loginInfo: LoginRequest) => {
    dispatch(login(loginInfo));
  };

  return [{ loading, handleLogin }];
};
