import React from "react";
import styled from "styled-components";

const StyledIconButton = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .iconText {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    color: ${(props: any) => props.fill};
  }
`;

interface Prop {
  icon?: any;
  fill?: string;
  iconText?: string;
  className?: string;
}

export const IconButton: React.FC<Prop> = (props) => {
  const Icon = props.icon;
  return (
    <StyledIconButton>
      <div>
        <Icon width="30px" style={{ alignSelf: 'center' }} fill={props.fill} />
      </div>
      <div style={{ color: props.fill }} className="iconText">{props.iconText}</div>
    </StyledIconButton>
  );
};
