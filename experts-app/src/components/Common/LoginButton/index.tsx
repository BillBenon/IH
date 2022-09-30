import React from 'react';
import styled, { css } from 'styled-components';

const ButtonStyle = css`
  overflow: hidden;
  height: 55px;
  font-family: Lato;
  background-color: #315cd5;
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
`

const StyledLoginButton = styled.button`
  ${ButtonStyle};
`;

const StyledSignUpButton = styled.button`
  ${ButtonStyle};
  height: 60px;
`;

interface IProps {
  children: any;
  className?: string;
  onClick?: any;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

export const LoginButton: React.FC<IProps> = ({ children, ...rest }) => {
  return <StyledLoginButton {...rest}>{children}</StyledLoginButton>;
};

export const SignupButton: React.FC<IProps> = ({ children, ...rest }) => {
  return <StyledSignUpButton {...rest}>{children}</StyledSignUpButton>;
};
