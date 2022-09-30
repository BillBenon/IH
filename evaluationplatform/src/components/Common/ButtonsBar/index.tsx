import { Options2Outline } from "@styled-icons/evaicons-outline/Options2Outline";
import React from 'react';
import styled from 'styled-components';
import { IconContainer } from '../IconContainer';
import { PageSelectButton } from '../PageSelectButton';
const Main = styled.div`
    .button-bar {
        padding-bottom: 20px;
        border-bottom: solid 2px #efefef;
    }
`;

export function ButtonsBar(props: IProps) {
    function handleClick(selectedValue: string) {
        props.handleClick(selectedValue);
    }

    return (
        <Main>
            <div className="d-flex align-items-center justify-content-between button-bar">
                <div className="d-flex align-items-center mx-3">
                    {props.buttonsInfo.map((btnInfo, ind) => (
                        <PageSelectButton
                            key={ind}
                            {...btnInfo}
                            selected={props.selectedPage === btnInfo.value}
                            onClick={handleClick} />
                    ))}
                </div>
                {props.showOptions && <IconContainer className="mx-4" height="30px" icon={Options2Outline} onClick={props.onOptionsClick} />}
            </div>
        </Main>
    )
}

interface IProps {
    buttonsInfo: { value: any, label: string }[];
    handleClick: Function;
    selectedPage: any;
    showOptions?: boolean;
    onOptionsClick?: Function;
}

