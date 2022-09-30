import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { loginAction } from '../../actions/auth/authActions';
import { RootState } from '../../store';
import { ExpertRequestLogin } from '../../types/ExpertLoginRequest';
import { B2B_MenuItems, RoleType, RouterMap } from '../../utilities/constants';

export const useProvideAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogin = (loginInfo: ExpertRequestLogin) => {
    dispatch(loginAction(loginInfo));
  }

  useEffect(() => {
    if (user?.expertId) {
      user.roleType === RoleType.HIRING_MANAGER ?
        history.push(RouterMap[B2B_MenuItems.jobs]) :
        history.push(RouterMap[user.lastActivity.level1]);
    }
  }, [user]);


  return [{ handleLogin }];
};
