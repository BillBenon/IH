import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/core';
import styled from 'styled-components';

interface IProps {
    loading: boolean;
    disableOverlay?: boolean;
}

interface IOverlayProps {
    noOverlay?: boolean;
}

export const OverlayLoader = ({ loading, disableOverlay }: IProps) => {
    const Overlay = styled.div`
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background: ${(props: IOverlayProps) => !!props.noOverlay ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.1)'};
        z-index: 9999;
        text-align: center;
    `;

    const override = css`
        z-index: 100;
        position: relative;
        top: 50%;
        text-align: center;
    `;

    return (
        <>
            { loading && <Overlay noOverlay={disableOverlay}>
                <BeatLoader css={override} color={'#3694D7'} loading={loading} />
            </Overlay>}
        </>
    )
}