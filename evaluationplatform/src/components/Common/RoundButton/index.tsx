import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  overflow: hidden;
  height: ${(props: any) => props.height || '48px'};
  width: ${(props: any) => props.width || '230px'};
  background: #e25252;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: white;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
  transition: 0.3s;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
`;

interface Props {
  children: any;
  className?: string;
  onClick?: any;
  disabled?: boolean;
}

export const RoundButton: React.FC<Props> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};
