import { QuestionField } from "components";
import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { talkToExpertService } from "../../services/talkToExpert";
import Modal from 'react-modal';
import { useSelector } from "react-redux";
import { RootState } from "store";

interface IStructuredFeedbackComponent {
    meetingDetailId: string;
    expertName: string;
}

export const QuestionDiv = styled.div`
    .question__description {
        width: auto !important;
    }
    .question__title {
        font-size: 18px;
    }
`;

export const StructuredFeedbackComponent = ({ meetingDetailId, expertName }: IStructuredFeedbackComponent) => {
    const [structuredFeedback, setStructuredFeedback] = useState<any>();
    const candidateInfo = useSelector((state: RootState) => state.evaluationPlatform.candidate);
    const [openRecorder, setOpenRecorder] = useState<string>('-1');

    useEffect(() => {
        getStructuredFeedback();
    }, [])

    const getStructuredFeedback = () => {
        talkToExpertService.getMeetingStructureFeedbackDetails({ meetingDetailId }).then((response) => setStructuredFeedback(response.output));
    }

    return <div>
        <div className="question__main">
            <div className="h3 text-dark font-weight-bold">{'List of selected questions'}</div>
            <QuestionDiv>
                {structuredFeedback &&
                    structuredFeedback.questions.map((question: any, idx: number) => {
                        return (
                            <QuestionField
                                idx={idx}
                                key={question.question._id}
                                candidateTrackId={structuredFeedback.candidateTrackId}
                                capabilityId={question.question.capabilities[0]?.capabilityId || question.question.indirectCapabilities[0]?.capabilityId}
                                questionSet={question}
                                handleMaximizeContent={() => { }}
                                isMaximizeContent={true}
                                setAnswer={() => { }}
                                saveResponseForQuestionOfCandidateTrack={() => { }}
                                Modal={Modal}
                                setQuestionId={() => { }}
                                currentQuestionId={question.question._id}
                                submitResponseToExpert={() => { }}
                                setFeedback={() => { }}
                                handleEdit={() => { }}
                                setQuestionFeedbackViewed={() => { }}
                                candidate={candidateInfo}
                                setCurrentAnsVersionId={() => { }}
                                saveCandidateLastActivity={() => { }}
                                goToPaymentPage={() => { }}
                                triggerFeedback={() => { }}
                                setTriggerFeedback={() => { }}
                                isMeetingView={true}
                                expertName={expertName}
                                openRecorder={openRecorder}
                                setOpenRecorder={setOpenRecorder}
                            />
                        );
                    })}
            </QuestionDiv>
        </div>
    </div>
}