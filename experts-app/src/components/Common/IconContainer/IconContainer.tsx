import React, { FC } from 'react'
import { StyledIcon } from '@styled-icons/styled-icon';
import styled from 'styled-components';

export interface IconContainerProps {
    icon: StyledIcon;
    color?: string;
    height?: string;
    onClick?: Function;
    disableHover?: boolean;
    style?: any;
    tooltip?: string;
    className?: string;
}

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 3px;
    &:hover{
        transform: ${(props: any) => `${!props.theme.disableHover && 'scale(1.1)'}`};
    }
    color: ${(props: any) => `${props.theme.color ? props.theme.color : '#5B94E3'}`} !important;
`;

export const IconContainer: FC<IconContainerProps> = (props) => {
    const Icon = props.icon;
    return (
        <IconWrapper className={props.className} title={props.tooltip} style={props.style} theme={props} onClick={(event: any) => props.onClick && props.onClick(event)}>
            <Icon height={props.height ? props.height : "20px"} />
        </IconWrapper>
    )
}
