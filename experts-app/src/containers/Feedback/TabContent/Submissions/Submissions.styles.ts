import { Button, Col, Container } from "react-bootstrap";
import styled from "styled-components";
import { UserCircle } from "@styled-icons/boxicons-solid/UserCircle";

export const UserPic = styled(UserCircle)`
    color: #E5E0DF;
`;

export const SubmissionWrapper = styled.div`
`;

export const SubmissionContent = styled(Container)`
    background: #FFFFFF;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    margin: 10px 0;
    padding: 1rem;
    min-width: 100%;
    @media (min-width: 1200px) {
        max-width: 1190px;
    }
    @media (min-width: 1300px) {
        max-width: 1290px;
    }
`;

export const UserDescriptor = styled(Col)`
    padding: 0;
`;

export const NormalSpan = styled.span`
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    color: #161616;
    display: block;
    height: 50%;
    padding-left: 3px;
`;

export const StatusSpan = styled.span`
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    color: #161616;
    display: block;
    height: 50%;
`;

export const SmallSpan = styled(Col)`
    text-align: right;
    color: #8D8D8D;
    font-size: 14px;
    line-height: 18px;
`;

export const Subheader = styled.span`
    text-align: left;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    color: #8D8D8D;
    font-size: 14px;
    padding-left: 10px;
`;

export const Chip = styled.span`
    border: 0 !important;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis !important;
    margin: 0 3px;
    width: auto;
    max-width: 100px;
    height: 16px;
    line-height: 0px;
    padding: 10px;
    letter-spacing: 0.32px;
    font-size: 12px;
    display: inline-block;
    border-radius: 1.42rem;
    color: ${(props: any) => `${props.theme.color}` || '#FFF4DE'};
    background-color: ${(props: any) => `${props.theme.backgroundcolor}` || '#FFF4DE'};
    &:hover{
        background-color: rgb(91, 148, 227);
        color:#fff;
    }
`;

export const ChipWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 50%;
    padding-top: .3em;
`;

export const TrackEnrollWrapper = styled.div`
    text-align: center;
    color: #5b94e3;
    margin-top: -0.2rem;
    margin-left: -3.5rem;
    font-size: 12px;
`;

export const PlacementPartnerWrapper = styled.div`
    padding: 5px;
    .partnerName{
        text-decoration-line: underline;
        font-weight: bold;
    }
    .noteSpan{
        color: #5b94e3;
    }
    .partnerDesc{
        display: inline-flex;
    }
    .evaluationInfo{
        font-weight: bold;
        bottom:0;
        position: fixed;
    }
`;

export const QuestionDiv = styled.div`
    font-size: 16px;
    position: relative;
    line-height: 24px;
    white-space: pre-wrap;
    color: #161616;
    padding-right: ${(props: any) => props.theme.lineClamp == 'none' ? 0 : '4em'};
    padding-left: 3px;
    padding-bottom: 5px;
    display: -webkit-box;
    -webkit-line-clamp: ${(props: any) => props.theme.lineClamp || 'none'};
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const AnswerDiv = styled.div`
    position: relative;
    white-space: pre-wrap;
    padding-right: ${(props: any) => props.theme.lineClamp == 'none' ? 0 : '4em'};
    line-height: 24px;
    color: #A8A8A8;
    display: -webkit-box;
    -webkit-line-clamp: ${(props: any) => props.theme.lineClamp || 'none'};
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 1em 0 1em 0;
`;