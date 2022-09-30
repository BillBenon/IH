import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    .modal-footer {
        background: #ecf0f1;
    }

    .modal-body {
        padding-top: 0.2rem;
        margin-bottom: 5px;
    }

    button.close {
        outline: none !important;
    }
`;

export const Header = styled.div`
    color: #636363;
    font-size: 26px;
`;

export const Body = styled.div`
    color: #999;
    font-size: 20px;
`;

export const CandidateName = styled.div`
    font-size: 16px;
    span:nth-child(2){
        color: #636363;
        font-size: 18px;
    }
`;

export const Footer = styled.div`
    display: flex;
`;

const ButtonCss = css`
    color: #fff;
    border-radius: 4px;
    transition: all 0.4s;
    border: none;
    padding: 8px 20px;
    outline: none !important;
    margin-left: 10px;
    cursor: pointer;
`;

export const CancelButton = styled.div`
    ${ButtonCss};
    background: #b0c1c6;
    :hover {
        background: #92a9af;
        transform: scale(1.05);
    }
`;

export const SubmitButton = styled.div`
    ${ButtonCss};
    background: #f15e5e;
    :hover {
        background: #ee3535;
        transform: scale(1.1);
    }
`;