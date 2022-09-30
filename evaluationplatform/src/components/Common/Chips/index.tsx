import React from 'react';
import styled from 'styled-components';

export type ChipCss = {
    fontSize: string;
    fontWeight?: string;
    letterSpace?: string;
}

const ChipDiv = styled.div`
    display: inline-block;
    padding: 5px;
    cursor: default;
    border-radius: 1rem;
    font-size: ${(props: any) => props.fontSize ?? '10px'};
    letter-spacing: ${(props: any) => props.letterSpace ?? '2px'};
    font-weight: ${(props: any) => props.fontWeight ?? 'inherit'};
    background-color: ${(props: any) => props.color || '#e0e0e0'};
`;

const Chip = ({ value, color, style }: IChips) => {

    return (
        <ChipDiv color={color} {...style}>
            <span>{value}</span>
        </ChipDiv>
    );
}

export default Chip;

interface IChips {
    value: string;
    color?: string;
    style?: ChipCss;
}