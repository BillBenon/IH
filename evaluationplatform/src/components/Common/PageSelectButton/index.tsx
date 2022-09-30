import styled from 'styled-components';
import React from 'react';

const StyledButton = styled.button<any>`
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
    border: ${(props: any) => props.selected && "1px solid #5B94E3"};
    color: ${(props: any) => props.selected && "#171717"};
    pointer-events: ${(props) => (props.disable ? 'none' : 'initial')};
    filter: ${(props) => (props.disable ? 'opacity(25%)' : 'unset')};
`;

export function PageSelectButton(props: IProps) {
    return (
        <StyledButton selected={props.selected} onClick={() => props.onClick(props.value)} disable={props.disable}>
            <div className="d-flex align-items-center">
                {props.label}
                {props.children}
            </div>
        </StyledButton>
    )
}

interface IProps {
    selected: boolean;
    label: string;
    value?: string;
    onClick: Function;
    disable?: boolean;
    children?: any;
}