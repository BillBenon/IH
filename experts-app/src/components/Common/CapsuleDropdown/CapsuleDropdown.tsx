import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';

const CapsuleLabel = styled.div`
  color: rgb(91, 148, 227);
  font-size: 12px;
  text-align: center;
  margin-right: 1em;
`;

const StyledCapsuleDropdown = styled.select`
  outline: none !important;
  font-style: normal;
  justify-content: center;
  height: 39px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: rgba(23, 23, 23, 0.6);
  border-radius: 20px;
  margin: 0px 0px;
  text-transform: uppercase;
  margin: 1em 15px 0 0;
  max-width: 14em;
  cursor: pointer;
  border: 0;
  background: #F4F4F4;
  padding: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  &:hover {
    background: #E3E3E3;
  }
  border: ${(props: any) => (props.valueName) && "1px solid #5B94E3"};
  color: ${(props: any) => (props.valueName) && "#171717"};
`;

interface IOption { id: string; name: string; }

interface IProps {
  options: IOption[];
  label: string;
  value: string | undefined;
  handleSelect?: any;
  index: number;
  valueName: string | null;
}

const SelectContainer = (props: IProps) => {
  return (
    <div>
      <StyledCapsuleDropdown
        key={props.index}
        {...props}
        onChange={(e: any) => {
          let index = e.nativeEvent.target.selectedIndex;
          let label = e.nativeEvent.target[index].text;
          let value = e.target.value;
          props.handleSelect(value, label);
        }
        }
        name="filters"
        id="filters"
        value={"0"}
      >
        <option value="0">
          {props.label}
        </option>
        {props.options &&
          props.options?.map((option: IOption, index: number) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
      </StyledCapsuleDropdown>
      <CapsuleLabel style={{ color: '#5B94E3' }}>{props.valueName}</CapsuleLabel>
    </div>
  );
};

export const CapsuleDropdown: React.FC<IProps> = (props) => {
  return <SelectContainer {...props} />;
};
