import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { changePassword } from '../../actions/auth/authActions';
import { setSuccess } from '../../actions/auth/authSlice';
import { RootState } from '../../store';
import { IChangePassword } from './IChangePassword';


export const useChangePassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { success } = useSelector((state: RootState) => state.auth);


  const handleChangePassword = (data: IChangePassword) => {
    dispatch(changePassword(data));
  }

  const handleLoginClick = () => {
    history.push("/Login");
  }

  useEffect(() => {
    if (success) {
      history.push('/Login');
      dispatch(setSuccess());
    }
  }, [success])

  return [{
    handleChangePassword,
    handleLoginClick,
  }];
};
