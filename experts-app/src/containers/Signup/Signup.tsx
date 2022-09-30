import React from 'react';

import { SignupView } from '../../components/Signup/SignupView';
import { useProvideAuth } from './Signup.hook';

export const Signup = () => {
  const [{ handleSignup }] = useProvideAuth();

  return (<SignupView handleSignup={(loginInfo: any) => handleSignup(loginInfo)} ></SignupView>)
}