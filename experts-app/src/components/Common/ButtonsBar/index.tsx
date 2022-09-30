import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CapsuleButton } from '../CapsuleButton';
import { PageSelectButton } from './../PageSelectButton';

const Main = styled.div`
    .button-bar {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: solid 2px #efefef;
    }
`;

export function ButtonsBar(props: IProps) {
    function handleClick(selectedValue: string) {
        props.onClickHandler(selectedValue);
    }

    return (
        <Main>
            <div className="button-bar">
                {props.buttonsInfo.map((btnInfo, ind) => (
                    <CapsuleButton
                        {...btnInfo}
                        key={btnInfo.value}
                        text={btnInfo.label}
                        active={props.selectedPage === btnInfo.value}
                        hideCount={true}
                        onClick={handleClick} >
                        {btnInfo.children}
                    </CapsuleButton>
                ))}
            </div>
        </Main>
    )
}

interface IProps {
    buttonsInfo: { value: any, label: string, children?: any }[];
    onClickHandler: Function;
    selectedPage: any;
}

