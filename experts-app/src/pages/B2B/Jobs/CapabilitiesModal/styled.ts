import styled, { css } from "styled-components";
import { theme } from '../../constants';
import { isMobile } from 'react-device-detect';

export const CategoryWrapper = styled.div`
    display: flex;
`;

export const SubCategoryWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const StyledCategory = css`
    font-size: 12px;
    line-height: 16px;
    padding: 4px 8px;
    margin-right: 8px;
    margin-top: 8px;
    border-radius: 4px;
    height: max-content;
    width: max-content;
`;

export const Category = styled.div`
    ${StyledCategory};
    background: #DEE7F8;
    color: ${theme.colors.PRIMARY_01};
    font-weight: 600;
`;

export const SubCategory = styled.div`
    ${StyledCategory};
    background: #D3F4D5;
    color: #25992D;
`;

export const Score = styled.div`
    ${StyledCategory};
    font-size: 14px;
    color: #fff;
    background: #7FBBB9;
    width: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    ${isMobile && `
        font-size: 12px;
    `};
`;

export const AttributesToggleContainer = styled.div`
    display: flex;
    flex-direction: column;

    .custom-switch .custom-control-label::before {
        cursor: pointer;
    }

    .custom-switch .custom-control-label::after {
        cursor: pointer;
    }
`;

export const THead = styled.th`
`;

export const TData = styled.td`
    ${isMobile && `
        max-width: 7rem;
        padding: .3rem !important;
    `};
`;

export const ToggleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;

    .category {
        font-weight: 600;
    }
`;