import { Expand, Highlight, Microphone, Plus, SelectMultiple, TrashAlt, Edit } from "@styled-icons/boxicons-regular";
import { IconContainer } from 'components/Common/IconContainer/IconContainer';
import {
    BigSpan, EllipsedSpan, NormalSpan,
    SmallSpan
} from 'components/CommonStyles';
import { ModalComponent } from "components/Modals/Modal";
import { SubmissionContent } from "containers/Feedback/TabContent/Submissions/Submissions.styles";
import { IMeetingQuestion } from "containers/Meeting/meetingTypes";
import { ModuleSelectionComponent } from "containers/Meeting/tab/components/ModuleSelectionComponent";
import { useLoader } from 'context/loaderContext';
import { useMessagePopup } from 'context/messagePopContext';
import React, { useEffect, useState } from 'react';
import { Button, Col, Collapse, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { meetingService } from 'services/meeting';
import { RootState } from "store";
import { QuestionTypes } from "utilities/constants";
import { AddCustomQuestion } from "./AddCustomQuestion";
import './index.css';
import { MeetingEvaluation } from "./MeetingEvaluation";


interface IMeetingQuestionComponent {
    candidateId: string,
    trackId: string,
    meetingDetailId: string,
    serviceType: string;
    onModuleSelectionClose: Function;
    onDelete: Function;
    readonly?: boolean;
    onQuestionAdd: Function;
    setIsQuestionAdded: Function;
}

export const MeetingQuestionComponent = ({ onQuestionAdd, candidateId, trackId, meetingDetailId, serviceType, onModuleSelectionClose, onDelete, readonly, setIsQuestionAdded }: IMeetingQuestionComponent) => {
    const Loader = useLoader();
    const message = useMessagePopup();

    const expertId = useSelector((state: RootState) => state.auth.user.expertId);
    const [showCustomQuestionModal, setShowCustomQuestionModal] = useState<boolean>(false);
    const [showModuleSelectionModal, setShowModuleSelectionModal] = useState<boolean | undefined>(undefined);
    const [meetingQuestions, setMeetingQuestions] = useState<IMeetingQuestion[]>([]);
    const [activeQuestion, setActiveQuestion] = useState<{ [x: number]: boolean }>({});
    const [expandedQuestion, setExpandedQuestion] = useState<IMeetingQuestion>();
    const [startRecording, setStartRecording] = useState<{ [x: number]: boolean }>({});
    const [customQuestionId, setCustomQuestionId] = useState<string>();

    const handleRecordAnswer = (question: IMeetingQuestion, inx: number) => {
        showQuestionEvaluations(question, inx, true);
    }

    const handleEditQuestion = (question: IMeetingQuestion, inx: number) => {
        setShowCustomQuestionModal(true);
        setCustomQuestionId(question.questionId);
    }

    const showQuestionEvaluations = (question: IMeetingQuestion, inx: number, isRecording?: boolean) => {
        setActiveQuestion({ [inx]: !activeQuestion[inx] });
        setExpandedQuestion({ ...question });
        setStartRecording({ ...startRecording, [inx]: !!isRecording });
    }

    const confirmBeforeDelete = (capabilityId: string, questionId: string) => {
        const text = "Are you sure you want to remove this question?";
        message.confirm(text, (response: any) => onQuestionDelete(capabilityId, questionId))
    }

    const onQuestionDelete = async (capabilityId: string, questionId: string) => {
        Loader.showLoader();
        await meetingService.deleteQuestionFromMeeting({ expertId, meetingDetailId, capabilityId, questionId });
        await getMeetingQuestions();
        onDelete();
        Loader.hideLoader();
    }

    const onCollapse = (inx: number) => {
        setActiveQuestion({ [inx]: !activeQuestion[inx] });
        setExpandedQuestion(undefined);
    }

    const getMeetingQuestions = async () => {
        const result = await meetingService.getMeetingQuestions({ meetingDetailId, expertId });
        setMeetingQuestions(result.output);
        result.output.length === 0 ? setIsQuestionAdded(false) : setIsQuestionAdded(true);
    }

    useEffect(() => {
        getMeetingQuestions();
    }, [])

    return (
        <>
            <Row>
                <Col className="d-flex justify-content-center align-items-center mb-2">
                    <Button className="d-flex align-items-center btn-sm border-0 font-weight-bold p-2" style={{backgroundColor: "green"}} onClick={() => setShowModuleSelectionModal(true)}><IconContainer color="white" icon={SelectMultiple} />{'Add Questions from Track'}</Button>
                    <Button className="d-flex align-items-center btn-sm ml-4 border-0 text-dark font-weight-bold p-2" style={{backgroundColor: "lightgreen"}} onClick={() => setShowCustomQuestionModal(true)}><IconContainer color="black" icon={Plus} />{'Add Custom Questions'}</Button>
                </Col>
            </Row>
            {meetingQuestions?.length ? meetingQuestions.map((question: IMeetingQuestion, inx: number) =>
                <SubmissionContent key={question.questionId} className="mt-2">
                    {!activeQuestion[inx] && <div className="col-12">
                        <Row className="align-items-center">
                            <Col xs={7}>
                                <EllipsedSpan>{inx + 1 + '. ' + question.title}</EllipsedSpan>
                                <SmallSpan>{`Question`}</SmallSpan>
                            </Col>
                            <Col xs={5}>
                                <Row>
                                    <Col>
                                        <NormalSpan>{question.containRecording ? 'Recorded' : 'Not Recorded'}</NormalSpan>
                                        <SmallSpan>{'Recording'}</SmallSpan>
                                    </Col>
                                    {question.questionStatus && <Col>
                                        <NormalSpan>{question.questionStatus}</NormalSpan>
                                        <SmallSpan>{'Status'}</SmallSpan>
                                    </Col>}
                                    <Col>
                                        <NormalSpan>{QuestionTypes[question.questionType]}</NormalSpan>
                                        <SmallSpan>{'Question Type'}</SmallSpan>
                                    </Col>
                                    {question.capabilityName && <Col>
                                        <NormalSpan>{question.capabilityName}</NormalSpan>
                                        <SmallSpan>{'Capability'}</SmallSpan>
                                    </Col>}
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="mt-2 text-right">
                                <div className="d-flex justify-content-end">
                                    {!readonly && question.questionType === "FOR_MEETING" && <Button type="button" className="btn-sm btn-warning d-flex mr-2" onClick={() => handleEditQuestion(question, inx)}><IconContainer tooltip={"Edit Custom Question"} color="white" icon={Edit} />{"Edit Question"}</Button>}
                                    {!readonly && <Button type="button" className="btn-sm btn-danger d-flex" onClick={() => confirmBeforeDelete(question.capabilityId, question.questionId)}><IconContainer tooltip="Remove Question" color="white" icon={TrashAlt} />{'Remove'}</Button>}
                                    {!readonly && <Button type="button" className="btn-sm btn-success d-flex ml-2" onClick={() => handleRecordAnswer(question, inx)}><IconContainer tooltip="Evaluate" color="white" icon={Microphone} />{'Record'}</Button>}
                                    {!readonly && <Button type="button" className="btn-sm btn-info d-flex ml-2" onClick={() => showQuestionEvaluations(question, inx)}><IconContainer tooltip={"Evaluate"} color="white" icon={Highlight} />{'Evaluate'}</Button>}
                                    {readonly && <Button type="button" className="btn-sm btn-info d-flex ml-2" onClick={() => showQuestionEvaluations(question, inx)}><IconContainer tooltip={"View Details"} color="white" icon={Expand} />{"View Details"}</Button>}
                                </div>
                            </Col>
                        </Row>
                    </div>}
                    <Collapse in={activeQuestion[inx]}>
                        <div>
                            {expandedQuestion && expandedQuestion.questionId === question.questionId && serviceType && <MeetingEvaluation
                                meetingDetailId={meetingDetailId}
                                trackId={trackId}
                                capabilityId={question.capabilityId}
                                questionId={question.questionId}
                                candidateId={candidateId}
                                serviceType={serviceType}
                                startRecording={startRecording[inx]}
                                onCollapse={() => onCollapse(inx)}
                                readonly={readonly}
                                onSave={getMeetingQuestions}
                            />}
                        </div>
                    </Collapse>
                </SubmissionContent>) : <div className="d-flex align-items-center justify-content-center mt-3 w-100 h5">
                {'Questions are not selected yet. Please add the questions for the meeting'}
            </div>}
            {(trackId && meetingDetailId) ? (showModuleSelectionModal &&
                <ModalComponent
                    className={"module-selector"}
                    show={showModuleSelectionModal}
                    handleClose={() => setShowModuleSelectionModal(false)}
                    header={'Select Questions for the Meeting'}
                >
                    <ModuleSelectionComponent
                        trackId={trackId}
                        meetingDetailId={meetingDetailId}
                        onClose={() => { setShowModuleSelectionModal(false); getMeetingQuestions(); onModuleSelectionClose() }}
                    />
                </ModalComponent>)
                : <></>}
            {(trackId && meetingDetailId) ? (showCustomQuestionModal &&
                <ModalComponent
                    className="module-selector"
                    show={showCustomQuestionModal}
                    handleClose={() => { setCustomQuestionId(undefined); setShowCustomQuestionModal(false)}}
                >
                    <AddCustomQuestion
                        customQuestionId={customQuestionId}
                        trackId={trackId}
                        meetingDetailId={meetingDetailId}
                        onCancel={() => { setCustomQuestionId(undefined); setShowCustomQuestionModal(false)}}
                        onSave={() => { getMeetingQuestions(); setCustomQuestionId(undefined); setShowCustomQuestionModal(false); onQuestionAdd() }}
                    />
                </ModalComponent>)
                : <></>}

        </>
    )
}
