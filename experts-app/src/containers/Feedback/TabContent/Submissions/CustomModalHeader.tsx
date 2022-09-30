import React from 'react';
import styled from 'styled-components';
import { BlueInterviewHelpLogoIcon } from '../../../../assets';
import { Subheader } from './Submissions.styles';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const IconContainer = styled.div`
    box-sizing: border-box;
    height: 50px;
    width: 50px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    background-image: url(${(props) => props.theme});
`;

const Title = styled.span`
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.01em;
    color: #000000;
`;

interface CustomModalHeaderProps {
    icon?: any | undefined;
    headerText?: string;
    subheaderText?: string;
}

export const CustomModalHeader: React.FC<CustomModalHeaderProps> = (props) => {
    return (
        <Wrapper>
            <IconContainer theme={props.icon ?? BlueInterviewHelpLogoIcon} />
            <Title className="ml-3">{props.headerText}</Title>
            {props.subheaderText && <Subheader>({props.subheaderText})</Subheader>}
        </Wrapper>
    );
}