import React from 'react';

import { LoginView } from '../../components/Login/LoginView';
import { useProvideAuth } from './Login.hook';

export const Login = () => {
  const [{ handleLogin }] = useProvideAuth();

  return (<LoginView handleLogin={(loginInfo: any) => handleLogin(loginInfo)} ></LoginView>)
}