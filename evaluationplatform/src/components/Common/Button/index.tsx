import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  overflow: hidden;
  height: 55px;
  font-family: Lato;
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
`;

interface IProps {
  children: any;
  className?: string;
  onClick?: any;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

export const Button: React.FC<IProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};
