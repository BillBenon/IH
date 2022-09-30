import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import RichTextEditor from '../../../../../components/Common/Editors/RichTextEditor';
import { QueryTabs } from '../../../../../components/Expert/Feedback/QueryTabs';
import { AnswerDiv } from '../Submissions.styles';
import useSubmissionDetail from './SubmissionDetail.utils';

interface QuestionHintsProps {
    hints: any[]
}

export const QuestionHints: React.FC<QuestionHintsProps> = (props) => {
    const [activeHint, setActiveHint] = useState(0);
    const [{ handleMarkedText }] = useSubmissionDetail();
    const handleTabClick = (e: any, index: number) => {
        e.stopPropagation();
        setActiveHint(index);
    }

    return (
        <>
            <QueryTabs
                precedingText="Hint"
                tabDetails={props.hints.map((hint: any, index: number) => { return { name: '' + (index + 1), identifier: index } })}
                activeIndex={activeHint}
                handleClick={handleTabClick}
            />
            <Row className={'mt-2'}>
                <Col style={{ letterSpacing: '0.32px' }} className={'h6 small'}>
                    <AnswerDiv>{props.hints[activeHint].title}</AnswerDiv>
                    <RichTextEditor
                        key={activeHint}
                        disabled={true}
                        id={`hints-${activeHint}`}
                        value={handleMarkedText(props.hints[activeHint].description)}
                        customStyles={{ height: 'auto', boxShadow: 'none', resize: 'none', background: 'white' }} />
                </Col>
            </Row>
        </>
    )
}