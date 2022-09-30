import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import RichTextEditor from '../../../../../components/Common/Editors/RichTextEditor';
import { QueryTabs } from '../../../../../components/Expert/Feedback/QueryTabs';
import { SampleSolution } from './ISubmissionDetail';
import { LeftIcon, RightIcon, SampleSolutionHeader } from './SubmissionDetail.styles';
import useSubmissionDetail from './SubmissionDetail.utils';

interface SampleSolutionProps {
    sampleSolutions: SampleSolution[]
}

export const SampleSolutions: React.FC<SampleSolutionProps> = (props) => {
    const [activeSolution, setActiveSolution] = useState(0);
    const [activeHint, setActiveHint] = useState(0);
    const [{ handleMarkedText }] = useSubmissionDetail();

    const handleTabClick = (e: any, index: number) => {
        e.stopPropagation();
        setActiveHint(index);
    }

    const handleSolutionMove = (direction: number) => {
        setActiveSolution(activeSolution + direction);
    }

    return (
        <>
            <Row className="mb-1 mt-1">
                <Col>
                    <SampleSolutionHeader className="mb-2 mt-2">{props.sampleSolutions[activeSolution]?.title}</SampleSolutionHeader>
                </Col>
                <Col className={'text-right'}>
                    <LeftIcon
                        onClick={() => activeSolution != 0 && handleSolutionMove(-1)}
                        theme={{ disabled: activeSolution == 0 }}
                    />
                    <RightIcon
                        onClick={() => activeSolution != props.sampleSolutions?.length - 1 && handleSolutionMove(1)}
                        theme={{ disabled: activeSolution == props.sampleSolutions?.length - 1 }}
                    />
                </Col>

            </Row>
            <Row className={'mb-2'}>
                <Col style={{ letterSpacing: '0.32px' }} className={'h6 small'}>
                    <RichTextEditor
                        key={activeSolution}
                        disabled={true}
                        id={`sampleSol-${activeSolution}`}
                        value={handleMarkedText(props.sampleSolutions[activeSolution]?.description)}
                        customStyles={{ height: 'auto', boxShadow: 'none', resize: 'none', background: 'white' }} />
                </Col>
            </Row>
            {!!props.sampleSolutions[activeSolution]?.hints?.length && <QueryTabs
                precedingText="Hint"
                tabDetails={props.sampleSolutions[activeSolution]?.hints.map((hint: string, index: number) => { return { name: '' + (index + 1), identifier: index } })}
                activeIndex={activeHint}
                handleClick={handleTabClick}
            />}
            <Row className={'mt-2'}>
                <Col style={{ letterSpacing: '0.32px' }} className={'h6 small'}>
                    <RichTextEditor
                        key={activeHint}
                        disabled={true}
                        id={`sampleSolHint-${activeHint}`}
                        value={handleMarkedText(props.sampleSolutions[activeSolution]?.hints[activeHint])}
                        customStyles={{ height: 'auto', boxShadow: 'none', resize: 'none', background: 'white' }} />
                </Col>
            </Row>
        </>
    )
}