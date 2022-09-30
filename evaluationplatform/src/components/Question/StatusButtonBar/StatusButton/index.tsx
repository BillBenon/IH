import React from 'react';
import { STATUS_BUTTON_COLORS } from 'theme/colors';
import styled from 'styled-components';

const StyledStatusButton = styled.button<any>`
  border-radius: 20px;
  width: fit-content;
  height: 36px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
  &:focus {
    outline: 0px solid transparent;
  }
  transition: 0.3s;
  background: '#e9e9e9';
  color: ${(props: any) =>  STATUS_BUTTON_COLORS[props.status]};
  padding: 9px 15px;
  cursor: pointer;
  font-family: Khula;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  border-width: ${(props: any) =>  props.active ? '2px' : '1px'};
  border-style: solid;
  border-color: ${(props: any) =>  props.active ? 'black' : 'rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)'};
  overflow: hidden;
  margin-top: 5px;
`;

interface Props {
  children: any;
  status: string;
  onClick?: Function;
  questionFilter: string;
  active: boolean
}

export const StatusButton: React.FC<Props> = (props) => {
  return <StyledStatusButton {...props}>{props.children}</StyledStatusButton>;
};
