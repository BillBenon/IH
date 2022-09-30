import styled, { css } from 'styled-components';
import { theme } from '../constants';

export const ModalFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 18px;

    input {
        width: 100%;
    }
`;

export const SubmitButton = styled.button<{ bg?: string, color?: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    padding: 10px 30px;
    color: ${({ color }) => color ? color : 'white'};
    font-family: Lato;
    background: ${({ bg }) => bg ? bg : theme.colors.PRIMARY_01};
    border-radius: 10px;
    border: none;
    outline: none !important;
    font-weight: 700;
    font-size: 12px;
    line-height: 26px;
    cursor: pointer;;
    margin-top: 12px;
    transition: 0.3s;
    &:hover {
        opacity: 0.8;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
    }

    &:disabled {
        opacity: .4;
    }
`;

export const CreateJobTitle = styled.div`
    font-size: 20px;
    margin-top: 10px;
    font-weight: 600;
`;

export const Label = styled.div`
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 20px;
`;

export const Title = styled.div`
    font-size: 36px;
    line-height: 44px;
    margin-bottom: 30px;
    text-align: center;
`;

export const FieldSet = styled.div`
    display: flex;
    flex-direction: column;

    select, .tree-view-wrapper {
        border: 1px solid ${theme.colors.PRIMARY_01};
        border-radius: 10px;
    }

    .rc-tree-list-holder-inner {
        width: fit-content;
    }
`;

export const JobCandidatesWrapper = styled.div<{ isMobile: boolean }>`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-right: 30px;

    ${({ isMobile }) => isMobile && `
        flex-direction: column;
    `};
`;

export const TypeWrapper = styled.div<{ isMobile: boolean, bg: string, mr?: number }>`
    flex: 0 0 19%;
    background: ${({ bg }) => bg};
    border-radius: 10px;
    min-height: 300px;
    margin-bottom: 30px;
    margin-right: 1%;
    padding: 20px 20px;
    color: ${theme.colors.PRIMARY_01};

    ${({ mr }) => mr !== undefined && `margin-right: ${mr}px`};

    ${({ isMobile }) => isMobile && `
        margin: 0 30px 30px 0;
    `};
`;

export const NavButtonContainer = styled.div`
    display: flex;    
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;
    margin-right: 30px;
    width: 100%;
`;

export const NavButton = styled.div`
    display: flex;
    align-items: center;
    background: rgb(49, 92, 213);
    color: rgb(255, 255, 255);
    padding: 5px 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        opacity: 0.8;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
    }

    svg {
        margin-right: 5px;
        height: 25px;
    }
`;

export const CandidateCardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    .
`;

export const CandidatesButton = styled.div<{ variant: 'primary' | 'secondary', mb?: number, mt?: number }>`
    padding: 5px;
    display: flex;
    justify-content: center;
    font-size: 14px;
    border: 2px solid ${theme.colors.PRIMARY_01};
    border-radius: 10px;
    margin-bottom: ${({ mb }) => mb !== undefined ? `${mb}px` : '10px'};
    margin-top: ${({ mt }) => mt !== undefined && `${mt}px`};
    font-weight: 600;
    cursor: pointer;
    background: ${({ variant }) => variant === 'primary' ? '#F2F7FD' : '#315CD5'};
    color: ${({ variant }) => variant === 'primary' ? '#315CD5' : '#FFFFFF'};
    &:hover {
        opacity: 0.8;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
    }
`;

export const ProgressBar = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const ProgressBarItem = styled.div<{ bg: string }>`
    ${({ bg }) => bg && `
        background: ${bg};
        flex-basis: 23%;
        border: 2px solid ${bg};
    `}
`;

export const InterviewActionButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
`;

export const InterviewActionButton = styled.button<{ bg: string }>`
    ${({ bg }) => bg && `
        flex-basis: 45%;
        height: 34px;
        background: ${bg};
        border: none;
        color: #FFFFFF;
        outline: none !important;
        border-radius: 10px;
        transition: 0.3s;
        &:hover {
            opacity: 0.8;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
        }
    `}
`;

export const LogoImage = styled.img`
    height: auto;
    cursor: pointer;
    margin-right: 4px;
`;