import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  outline: none !important;
  font-style: normal;
  justify-content: center;
  height: 39px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  padding: 11px 16px;
  color: rgba(23, 23, 23, 0.6);
  box-sizing: border-box;
  border-radius: 20px;
  margin: 0px 0px;
  margin: 1em 15px 0 0;
  text-transform: uppercase;
  border: 0;
  background: #F4F4F4;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background: #E3E3E3;
  }
  border: ${(props: any) => props.active && "1px solid #5B94E3"};
  color: ${(props: any) => props.active && "#171717"};
`;

interface IProps {
  text: string;
  count?: number;
  onClick: any;
  type?: "button" | "submit" | "reset" | undefined;
  background?: "primary" | "secondary" | "default";
  active?: boolean;
  hideCount?: boolean;
  value?: any;
  children?: any;
}

const InnerCapsuleButton = (props: IProps) => {
  return (
    <StyledButton {...props} onClick={() => props.onClick(props.value) }>
      <div className="d-flex align-items-center">
      {props.text + (!props.hideCount ? " (" + `${props.count ?? 0}` + ")" : "")}
        {props.children}
        </div>
    </StyledButton>
  );
};

export const CapsuleButton: React.FC<IProps> = (props) => {
  useEffect(() => { }, []);
  return (
    <InnerCapsuleButton
      {...props}
      onClick={props.onClick}
      active={props.active}
    />
  );
};
