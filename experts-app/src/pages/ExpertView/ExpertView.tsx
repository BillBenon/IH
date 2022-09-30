import { css } from '@emotion/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { setExpert } from '../../actions/auth/authSlice';
import { ExpertDetail } from '../../containers/Login/ILogin';
import MainHeader from '../../containers/MainHeader';
import { Sidebar } from '../../containers/Sidebar';
import { useMenuVisibility } from '../../providers/menuVisibilityProvider';
import BrowserCacheService from '../../services/browser-cache';

export const LoaderStyles = css`
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -50px 0px 0px -50px;

`;

export const InProgressWrapper = styled.div`
    padding: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    text-align: center;
    width: 100%;
    color: rgba(23, 23, 23, 0.6);
`;

const ExpertView = (props: any) => {
  const { isMenuVisible } = useMenuVisibility()!;
  const dispatch = useDispatch();
  const history = useHistory();

  function handleRouting(): void {
    BrowserCacheService.getItem("auth", (value: ExpertDetail | undefined) => {
      if (value?.expertId && value.lastActivity?.level1) {
        dispatch(setExpert(value));
      } else {
        history.push("/login");
      }
    });
  }

  useEffect(handleRouting, []);

  return (
    <>
      <MainHeader isMaximizeContent={!isMenuVisible} />
      <Sidebar isMaximizeContent={!isMenuVisible} />
      {props.children}
    </>
  );
};

export default ExpertView;
