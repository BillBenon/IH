import React, { FC } from 'react';
import { StyledIcon } from '@styled-icons/styled-icon';
import styled from 'styled-components';

interface CustomStyledIconProps {
  icon: StyledIcon;
  color: string;
  onClick?: Function;
  text?: string;
  className?: string
  height?: string;
  style?: any;
}

const IconWrapper = styled.button`
  background: transparent;
  border: 0;
  font-size: x-small;
  display: grid;
  justify-items: center;
  outline: none !important;
  margin: 0 1rem;
  &:hover {
    transform: scale(1.1);
  }
  color: ${(props: any) => `${props.theme.color}`} !important;
`;

export const CustomStyledIcon: FC<CustomStyledIconProps> = (props) => {
  const { onClick } = props;
  const Icon = props.icon;
  return (
    <IconWrapper className={props.className} style={props.style} theme={props} onClick={() => onClick && onClick()}>
      <Icon height={props.height ? props.height : '32px'} />
      {props.text}
    </IconWrapper>
  );
};
