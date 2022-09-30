import styled from 'styled-components';
import React, { useState } from 'react';

const StyledButton = styled.button<any>`
  margin-left: 50px;
  border-radius: 20px;
  width: fit-content;
  height: 36px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
  &: focus {
      outline: none;
  }
  transition: 0.3s;
  background: '#e9e9e9';
  color: ${(props) => (props.selected ? '#5B94E3' : 'black')};
  padding: 6px 15px;
  cursor: pointer;
  font-family: Khula;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
  overflow: hidden;
`;

export function PageSelectButton(props: IProps) {
    return (
        <StyledButton selected={props.selected} onClick={() => props.onClick(props.value)}>
            {props.label}
        </StyledButton>
    )
}

interface IProps {
    selected: boolean;
    label: string;
    value: string;
    onClick: Function;
}