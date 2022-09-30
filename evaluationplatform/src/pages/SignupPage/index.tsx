import React from 'react';
import { isOpenedFromLandingPages } from 'utilities/landingPageUtil';
import { SignupHeader, Signup } from '../../containers';

export const SignupPage = (props: any) => {
  return (
    <>
      {!isOpenedFromLandingPages() && (
        <SignupHeader background="#315CD5" color="white" />
      )}
      <Signup history={props.history} />
    </>
  );
};
