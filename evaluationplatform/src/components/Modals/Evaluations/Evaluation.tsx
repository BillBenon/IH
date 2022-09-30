import { useMessagePopup } from 'context/messagePopup';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { notEmpty } from 'utilities';
import { ChevronLeft } from '@styled-icons/boxicons-regular/ChevronLeft';
import { ChevronRight } from '@styled-icons/boxicons-regular/ChevronRight';

const EvalHeader = styled.span`
    line-height: 16px;
    letter-spacing: 0.32px;
    color: #525252;
`;


const RightIcon = styled(ChevronRight)`
    height: 24px;
    pointer-events: ${(props) => props.theme.disabled ? 'none' : 'all'};
    color: ${(props) => props.theme.disabled ? 'rgba(0, 0, 0, 0.16)' : '#171717'};
    cursor: pointer;
    &:hover{
        background: ${(props) => props.theme.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    }
`;

const LeftIcon = styled(ChevronLeft)`
    height: 24px;
    pointer-events: ${(props) => props.theme.disabled ? 'none' : 'all'};
    color: ${(props) => props.theme.disabled ? 'rgba(0, 0, 0, 0.16)' : '#171717'};
    cursor: pointer;
    &:hover{
        background: ${(props) => props.theme.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    }
`;
const StyledEvals = styled.div`
    .evals{
        background: #f3f3f3;
        padding-top: 15px;
        padding-bottom: 15px;
    }
`;


interface IProps {
    capEvaluations: any,
}

const Evaluations = ({ capEvaluations }: IProps) => {
    const message = useMessagePopup();
    const [currentEvaluationIndex, setCurrentEvaluationIndex] = useState(0);
    const [hidePrevIcon, setHidePrevIcon] = useState(false);
    const [hideNextIcon, setHideNextIcon] = useState(false);

    useEffect(() => {
        if (currentEvaluationIndex === 0) setHidePrevIcon(true);
        else setHidePrevIcon(false);
        if (currentEvaluationIndex === capEvaluations.length - 1) setHideNextIcon(true);
        else setHideNextIcon(false);
    }, [currentEvaluationIndex, capEvaluations]);

    const handlePreviousHint = () => {
        setCurrentEvaluationIndex(currentEvaluationIndex - 1);
    };
    const handleNextHint = () => {
        setCurrentEvaluationIndex(currentEvaluationIndex + 1);
    };

    return (
        <StyledEvals>
            {notEmpty(capEvaluations) && (<>
                <Row className="mb-1 mt-1">
                    <Col xs="10">
                        <EvalHeader className="mb-2 mt-2 pr-2 h6">{capEvaluations[currentEvaluationIndex]?.capabilityText}</EvalHeader>
                    </Col>
                    <Col xs="2" className={'d-inline text-right pr-2'}>
                        <LeftIcon
                            onClick={handlePreviousHint}
                            theme={{ disabled: hidePrevIcon }}
                        />
                        <RightIcon
                            onClick={handleNextHint}
                            theme={{ disabled: hideNextIcon }}
                        />
                    </Col>
                </Row>
                <Row className={'mb-2'}>
                    <Col style={{ letterSpacing: '0.32px' }} className={'h6 small'}>
                        <ul className='evals'>
                            {capEvaluations[currentEvaluationIndex]?.evaluations.map((el: any) => el.evalText && <li key={el.evalText}>{el.evalText}</li>)}
                        </ul>
                    </Col>
                </Row>
            </>)}
            {!notEmpty(capEvaluations) && message.info('No Evaluations are available')}
        </StyledEvals>
    )
};

export default Evaluations;
