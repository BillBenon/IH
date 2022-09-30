import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { WhiteInterviewHelpLogoIcon } from '../../assets';
import { Logo } from '../Common/Logo';

const StyledLoginButton = styled(Button)`
  width: 129px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 2px solid white;
  font-weight: bold;
  line-height: 24px;
  text-align: center;
  padding: 0px;
`;

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${(props: any) => props.background || 'white'};
  height: 57px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  padding-right: 34px;
  * {
    background: ${(props: any) => props.background || 'white'};
    color: ${(props: any) => props.color || 'black'};
  }
`;

interface Props {
  children?: any;
  background?: string;
  color?: string;
  handleClick?: Function;
}

export const SignupHeader: React.FC<Props> = (props) => {
  return (
    <StyledHeader {...props}>
      <Logo
        logoImage={WhiteInterviewHelpLogoIcon}
        imageSize="35px"
        logoText={'Expert'}
        fontWeight="bold"
        textSize="20px"
        color={props.color || 'white'}
      />
      <Link to="/" style={{ textDecoration: 'none' }}>
        <StyledLoginButton onClick={props.handleClick}>Sign in</StyledLoginButton>
      </Link>
    </StyledHeader>
  );
};