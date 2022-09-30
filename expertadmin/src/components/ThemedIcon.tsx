import { StyledIcon } from '@styled-icons/styled-icon';
import React, { FC } from 'react';
import styled from 'styled-components';

interface ThemedIconProps {
  icon: StyledIcon;
  theme: any;
  onClick: Function;
}

const Wrapper = styled.div`
  svg {
    height: 24px;
    color: ${(props) =>
      props.theme.disabled ? 'rgba(0, 0, 0, 0.16)' : '#171717'};
    cursor: pointer;
    &:hover {
      background: ${(props) =>
        props.theme.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    }
  }
`;

export const ThemedIcon: FC<ThemedIconProps> = (props) => {
  const Icon = props.icon;
  return (
    <Wrapper theme={props.theme} onClick={() => props.onClick()}>
      <Icon height="32px" />
    </Wrapper>
  );
};
