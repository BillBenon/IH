import { Button, Row } from "react-bootstrap";
import styled from "styled-components";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { Info } from "@styled-icons/icomoon/Info"
import { Pencil } from "@styled-icons/remix-line/Pencil";
import { ChevronRight } from "@styled-icons/boxicons-regular/ChevronRight";
import { ChevronUp } from "@styled-icons/boxicons-regular/ChevronUp";
import { ChevronLeft } from "@styled-icons/boxicons-regular/ChevronLeft";

export const SampleSolutionHeader = styled.span`
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.32px;
    color: #525252;
`

export const QuestionContainer = styled.div`
    display: block;
    margin-top: 1rem;
`;

export const QuestionLinks = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 1em;
`;

export const LinkWrapper = styled.div`
    display: block;
`;

export const SubmissionHeader = styled.h5`
    display: flex;
    margin: 1em 0 0.5em 0;
`;

export const DropdownIcon = styled(ChevronDown)`
    color: #000000;
    height: 30px;
    align-items: center;
    margin-left: .5em;
    font-size: large;
    padding-bottom: 5px;
    cursor: pointer;
`;

export const DropupIcon = styled(ChevronUp)`
    color: #000000;
    height: 30px;
    align-items: center;
    margin-left: .5em;
    font-size: large;
    padding-bottom: 5px;
    cursor: pointer;
`;

export const RightIcon = styled(ChevronRight)`
    height: 24px;
    color: ${(props) => props.theme.disabled ? 'rgba(0, 0, 0, 0.16)' : '#171717'};
    cursor: pointer;
    &:hover{
        background: ${(props) => props.theme.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    }
`;

export const LeftIcon = styled(ChevronLeft)`
    height: 24px;
    color: ${(props) => props.theme.disabled ? 'rgba(0, 0, 0, 0.16)' : '#171717'};
    cursor: pointer;
    &:hover{
        background: ${(props) => props.theme.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    }

`;

export const InnerSpan = styled.span`
    font-weight: 600;
    font-size: 16px;
`;

export const SliderHeading = styled.h6`

`;

export const InformationCircleIcon = styled(Info)`
    width: 30px;
    padding-left: 10px;
    color: #5B94E3;
`;

export const RowHeader = styled(Row)`
    align-items: 'center';
    margin: "10px 0";
`;

export const EvalInprogressDot = styled.span`
    height: 7px;
    width: 7px;
    background: #5B94E3;
    border-radius: 50%;
    position: absolute;
    left: 30px;
    top: 1px;
    border: 1px solid #FFF;
    `;

export const PencilIcon = styled(Pencil)`
    height: 20px;
    width: 20px;
    border-bottom: ${(props: any) => '1px solid' + props.theme.color};
    cursor: pointer;
    color: ${(props: any) => props.theme.color};
`;

export const FlexBox = styled.div`
    display: flex;
    color: #000000;
    justify-content: space-between;
`;

export const CustomDropup = styled(DropupIcon)`
    height: 20px;
    margin-left: 0;
    padding-bottom: 0;
    color: #525252;
`;

export const CollapseLink = styled(Button)`
    font-size: 14px;
    text-decoration: none;
    padding: 5px 10px !important;
    color: #525252;
    &:focus {
        text-decoration: none;
    }
    &:hover {
        color: #525252;
        background: #E3E3E3;
        text-decoration: none;
    }
`;