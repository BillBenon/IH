import { StyledIcon } from '@styled-icons/styled-icon';
import React, { FC, useRef, useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import styled from 'styled-components';

export interface IconContainerProps {
  icon: StyledIcon;
  color?: string | false;
  height?: string;
  onClick?: Function;
  disableHover?: boolean;
  style?: any;
  tooltip?: string;
  className?: string;
  disabled?: boolean;
  popoverContent?: string;
  popoverTitle?: string;
  label?: string | null | undefined;
}

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 3px;
  &:hover {
    transform: ${(props: any) =>
    `${!props.theme.disableHover && 'scale(1.1)'}`};
  }
  color: ${(props: any) =>
    `${props.theme.color ? props.theme.color : '#5B94E3'}`} !important;
`;

const StyledSpan = styled.span`
  display: inline-block;
  margin-top: -4px;
  font-size: initial;
`

export const IconContainer: FC<IconContainerProps> = (props) => {
  const Icon = props.icon;
  const target = useRef(null);
  const [show, setShow] = useState<boolean>(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{props.popoverTitle}</Popover.Title>
      <Popover.Content>
        {props.popoverContent}
      </Popover.Content>
    </Popover>
  );

  const iconWrapper = <IconWrapper
    ref={target}
    className={props.className}
    title={props.tooltip}
    style={{ ...props.style, pointerEvents: props.disabled ? 'none' : 'all' }}
    theme={props}
    onClick={(event: any) => { props.onClick && props.onClick(event); props.tooltip && setShow(!show) }}
  >
    <Icon height={props.height ? props.height : '20px'} />
  </IconWrapper>
  return (
    <>
      {props.label && <StyledSpan>{props.label}</StyledSpan>}
      {(props.popoverTitle && props.popoverContent) ? <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        {iconWrapper}
      </OverlayTrigger> : iconWrapper}
    </>
  );
};
