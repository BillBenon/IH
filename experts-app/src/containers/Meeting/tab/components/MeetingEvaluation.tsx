import { Microphone } from "@styled-icons/boxicons-regular";
import { WindowMinimize } from "@styled-icons/fa-regular/WindowMinimize"
import { FileAudio } from "@styled-icons/fa-solid";
import { SettingsVoice } from "@styled-icons/material-sharp/SettingsVoice";
import AudioRecorder from 'components/AudioRecorder';
import { AppButton } from 'components/Common/AppButton';
import { AppLink } from 'components/Common/AppLink';
import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import { IconContainer } from 'components/Common/IconContainer/IconContainer';
import { QueryTabs } from 'components/Expert/Feedback/QueryTabs';
import { ModalComponent } from 'components/Modals/Modal';
import AnswerWrapper from 'containers/Feedback/TabContent/Submissions/SubmissionDetail/AnswerWrapper';
import { CandidateAttachments } from 'containers/Feedback/TabContent/Submissions/SubmissionDetail/CandidateAttachments';
import { CandidateRecordings } from 'containers/Feedback/TabContent/Submissions/SubmissionDetail/CandidateRecordings';
import { FeedbackComponent } from 'containers/Feedback/TabContent/Submissions/SubmissionDetail/Feedback';
import { AnswerContainer, EvaluatedCapabilityWithActive, EvalWithActive, FeedbackWithActive, QuestionDetail } from "containers/Feedback/TabContent/Submissions/SubmissionDetail/ISubmissionDetail";
import { QuestionHints } from 'containers/Feedback/TabContent/Submissions/SubmissionDetail/QuestionHints';
import { SampleSolutions } from 'containers/Feedback/TabContent/Submissions/SubmissionDetail/SampleSolutions';
import { FlexBox, LinkWrapper, QuestionContainer, QuestionLinks, SubmissionHeader } from 'containers/Feedback/TabContent/Submissions/SubmissionDetail/SubmissionDetail.styles';
import { QuestionDiv, SmallSpan } from "containers/Feedback/TabContent/Submissions/Submissions.styles";
import { IQuestionCapability } from "containers/Meeting/meetingTypes";
import { useLoader } from 'context/loaderContext';
import React, { useEffect, useState } from 'react';
import { Button, Col, Spinner } from 'react-bootstrap';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { meetingService } from 'services/meeting';
import { submissionService } from 'services/submission';
import { RootState } from 'store';
import styled from 'styled-components';
import { Attachment } from 'styled-icons/entypo';
import { getSketchDataCopyFromArray } from 'utilities';
import { ChevronUp } from "@styled-icons/boxicons-regular/ChevronUp";
import { FEEDBACK_TYPES, EXPERT_EVAL_METRICS_FEEDBACK, EXPERT_STATUS_PRIORITY } from 'utilities/constants';


export const EllipsedSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  p{
    margin-bottom: 0px !important;
  }
`;

interface IMeetingEvaluation {
    trackId: string;
    capabilityId: string;
    candidateId: string;
    questionId: string;
    meetingDetailId: string;
    serviceType: string;
    startRecording: boolean;
    onCollapse: Function;
    readonly?: boolean;
    onSave: () => void;
}


export const MeetingEvaluation = ({ trackId, capabilityId, questionId, candidateId, meetingDetailId, serviceType, startRecording, onCollapse, readonly, onSave }: IMeetingEvaluation) => {
    const Loader = useLoader();
    const expert = useSelector((state: RootState) => state.auth.user);
    const [detailedSubmission, setDetailedSubmission] = useState<{ question: QuestionDetail, answers: AnswerContainer[] }>();
    const [activeSubmission, setActiveSubmission] = useState<number>(0);
    const [showRecordingModal, setShowRecordingModal] = useState<boolean>(false);
    const [showAttachmentModal, setShowAttachmentModal] = useState<boolean>(false);
    const [showQuestionHintsModal, setShowQuestionHintsModal] = useState<boolean>(false);
    const [showSampleSolutionsModal, setShowSampleSolutionsModal] = useState<boolean>(false);
    const [questionSampleSolutions, setQuestionSampleSolutions] = useState<any>();
    const [questionHints, setQuestionHints] = useState<any>();
    const [isVoiceRecorderOpen, setIsVoiceRecorderOpen] = useState<boolean>(startRecording);
    const [recordingDirectory, setRecordingDirectory] = useState<string>();
    const [isRecordingMinimized, setIsRecordingMinimized] = useState<boolean>(false);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [queryTabs, setQueryTabs] = useState<any>([]);
    const [initialDataLoaded, setInitialDataLoaded] = useState<boolean>(false);

    const getMeetingEvaluations = async () => {
        Loader.showLoader();
        const questionCapability: IQuestionCapability = {
            questionId,
            capabilityId
        }
        let input = {
            trackId,
            expertId: expert.expertId,
            candidateId,
            questionCapabilities: [questionCapability],
            meetingDetailId
        };
        const result = await meetingService.getMeetingEvaluations(input);
        setDetailedSubmission(result.output[0])
        setInitialDataLoaded(true);
        Loader.hideLoader();
    }

    const handleShowQuestionHintsModal = async (value: boolean, questionId: string) => {
        if (detailedSubmission) {
            setShowQuestionHintsModal(value);
            const result = await submissionService.getHints({ questionId, candidateTrackId: detailedSubmission.answers[activeSubmission].answer?.candidateTrackId, expertId: expert.expertId });
            setQuestionHints(result.payload);
        }
    }

    const handleShowSampleSolutionsModal = async (value: boolean, questionId: string) => {
        if (detailedSubmission) {
            setShowSampleSolutionsModal(value);
            const result = await submissionService.getSampleSolutions({ questionId, candidateTrackId: detailedSubmission.answers[activeSubmission].answer?.candidateTrackId, expertId: expert.expertId });
            setQuestionSampleSolutions(result.payload);
        }
    }

    const handleLastThreeTabs = (answers: AnswerContainer[]) => {
        let selectedanswer = answers;
        if (answers?.length > 3) {
            let selectedarr = selectedanswer?.filter((a: AnswerContainer, inx: number) => inx < 3);
            let selectedarrwithparentindex: any[] = [];
            answers.forEach((answer: AnswerContainer, pindex: number) => {
                if (selectedarr.some((ans: AnswerContainer) => ans.answer._id === answer.answer._id)) {
                    selectedarrwithparentindex.push(pindex);
                }
            })
            return selectedarrwithparentindex;
        }
        else {
            return selectedanswer?.map((answer: AnswerContainer) => {
                let parentinx = answers.findIndex((ans: AnswerContainer) => ans.answer._id === answer.answer._id);
                return parentinx;
            });
        }
    }

    const handleSaveFeedback = async () => {
        if (detailedSubmission) {
            const input = {
                meetingDetailId,
                candidateId,
                expertId: expert.expertId,
                trackId,
                candidateTrackId: detailedSubmission.answers[activeSubmission].feedbacks[0].candidateTrackId,
                serviceType,
                structureFeedback: {
                    ...detailedSubmission.answers[activeSubmission].feedbacks[0],
                    questionAnswerId: detailedSubmission.answers[activeSubmission].answer._id,
                    questionId: detailedSubmission.question._id,
                    questionTitle: detailedSubmission.question.title,
                    capabilityId,
                    containRecording: detailedSubmission.answers[activeSubmission].answer.containRecording,
                    feedbackId: detailedSubmission.answers[activeSubmission].feedbacks[0]._id
                }
            };
            setIsSaving(true);
            const result = await meetingService.saveMeetingStructureFeedback(input);
            setIsSaving(false);
            onSave();
            const inx = result.output.structureFeedbacks.findIndex((f: any) => f.questionId === detailedSubmission.question._id);
            if (inx !== -1) {
                detailedSubmission.answers[activeSubmission].feedbacks[0]._id = result.output.structureFeedbacks[inx].feedbackId;
                setDetailedSubmission({ ...detailedSubmission });
            }
        }
    }

    const handleSliderChange = (answerInx: number, feedbackInx: number, value: number, capabilityId: string, evalId: string) => {
        if (detailedSubmission) {
            detailedSubmission.answers[activeSubmission].feedbacks[feedbackInx].evaluatedCapabilities.map(cap => {
                if (cap.capabilityId === capabilityId) {
                    cap.evals.map(evaluation => {
                        if (evaluation.evalId === evalId) {
                            evaluation.evalMetricsFeedbackValue = value;
                            evaluation.evalMetricsFeedback = EXPERT_EVAL_METRICS_FEEDBACK.EVAL(value);
                        }
                        return evaluation;
                    })
                }
                return cap;
            });
            setDetailedSubmission({ ...detailedSubmission });
        }
    }

    const onExpandEval = (capabilityId: string, evalId: string, isActive: boolean, answerInx: number, feedbackInx: number) => {
        if (detailedSubmission) {
            detailedSubmission.answers[activeSubmission].feedbacks[feedbackInx].evaluatedCapabilities.map(cap => {
                if (cap.capabilityId === capabilityId) {
                    cap.evals.map(evaluation => {
                        if (evaluation.evalId === evalId) {
                            evaluation.isActive = isActive;
                        }
                        return evaluation;
                    })
                }
                return cap;
            });
            setDetailedSubmission({ ...detailedSubmission });
        }
    }

    const handleCommentChange = (answerInx: number, feedbackInx: number, value: string, capabilityId: string, evalId: string) => {
        if (detailedSubmission) {
            detailedSubmission.answers[activeSubmission].feedbacks[feedbackInx].evaluatedCapabilities.map(cap => {
                if (cap.capabilityId === capabilityId) {
                    cap.evals.map(evaluation => {
                        if (evaluation.evalId === evalId) {
                            evaluation.evalTextFeedback = value;
                        }
                        return evaluation;
                    })
                }
                return cap;
            });
            setDetailedSubmission({ ...detailedSubmission });
        }
    }

    const handleFeedbackchange = (answerInx: number, feedbackInx: number, value: string) => {
        if (detailedSubmission) {
            detailedSubmission.answers[activeSubmission].feedbacks[feedbackInx].feedback = value;
            setDetailedSubmission({ ...detailedSubmission });
        }
    }

    const handleVoiceRecorderClose = () => {
        setIsVoiceRecorderOpen(false);
    }

    const handleMinimize = () => {
        setIsRecordingMinimized(true);
        document.body.style.overflow = "auto";
    }

    const handleAddVoiceRecording = (cantainRecording?: boolean) => {
        let richText = detailedSubmission?.answers[activeSubmission].answer.answer;
        const recordingText = "[This answer contains recordings]\n";
        const noRecordingText = "[No Recordings]\n";
        let containRecording = false;
        if ((!richText || richText?.indexOf(recordingText) === -1) && cantainRecording) {
            richText = `${recordingText}` + richText;
            containRecording = true;
        }
        else {
            richText = richText?.replace(recordingText, noRecordingText) || "";
            containRecording = false;
        }
        if (detailedSubmission) {
            detailedSubmission.answers[activeSubmission].answer.answer = richText;
            detailedSubmission.answers[activeSubmission].answer.containRecording = containRecording;
            setDetailedSubmission({ ...detailedSubmission });
        }
    }

    const handleVoiceRecorderSubmit = (cantainRecording?: boolean) => {
        setIsVoiceRecorderOpen(false);
        handleAddVoiceRecording(cantainRecording)
    }

    const historySketchData = detailedSubmission && getSketchDataCopyFromArray(detailedSubmission.answers);


    useEffect(() => {
        getMeetingEvaluations();
    }, [])

    useEffect(() => {
        const totalVersions = detailedSubmission?.answers?.length || 1;
        const dir = candidateId + "/" + capabilityId + "/" + questionId + "/recordings/v" + totalVersions;
        setRecordingDirectory(dir);
        if (detailedSubmission) {
            const tabs = handleLastThreeTabs(detailedSubmission?.answers.reverse() || [])?.map((qindex: number) => { return { name: "" + ((detailedSubmission?.answers?.length || 0) - qindex), identifier: qindex }; });
            setQueryTabs(tabs);
            if (tabs.length) {
                setActiveSubmission(tabs[0].identifier);
            }
        }
    }, [initialDataLoaded])


    return (
        detailedSubmission ? <>
            <div className="d-flex align-items-center justify-content-end">
                <Button type="button" className="btn-sm btn-success d-flex ml-2" onClick={() => { isRecordingMinimized ? setIsRecordingMinimized(false) : setIsVoiceRecorderOpen(true); }}><IconContainer tooltip="View/Record Answer" color="white" icon={Microphone} />{readonly ? "View Recordings" : (isRecordingMinimized ? 'Maximize Recording Window' : 'Record')}</Button>
                <Button type="button" className="btn-sm btn-info d-flex ml-2" onClick={() => onCollapse()}><IconContainer tooltip="Collapse" color="white" icon={ChevronUp} />{'Collapse'}</Button>
            </div>
            <QuestionContainer id={"submissionDetail"}>
                <QuestionDiv > {'Q) ' + detailedSubmission.question.title}</QuestionDiv >
                <RichTextEditor
                    value={detailedSubmission.question.description}
                    disabled={true}
                    id={detailedSubmission.question._id}
                    placeholder='Question should appear here...'
                />
                <QuestionLinks>
                    <LinkWrapper>
                        {!!detailedSubmission.question?.hintIds?.length && !!detailedSubmission.answers[activeSubmission].answer?.candidateTrackId && <AppLink onClick={() => handleShowQuestionHintsModal(true, detailedSubmission.question._id)} variant="link">{'Question Hints'}</AppLink>}
                        {!!detailedSubmission.question?.solutionIds?.length && !!detailedSubmission.answers[activeSubmission].answer?.candidateTrackId && <AppLink onClick={() => handleShowSampleSolutionsModal(true, detailedSubmission.question._id)} variant="link">{'Sample Solutions'}</AppLink>}
                    </LinkWrapper>
                </QuestionLinks>
                <FlexBox>
                    {!!queryTabs.length && <QueryTabs
                        precedingText="Submission"
                        tabDetails={queryTabs}
                        activeIndex={activeSubmission}
                        handleClick={(e: any, index: number) => setActiveSubmission(index)}
                    />}
                    <div className='d-flex'>
                        <IconContainer
                            className="mr-2"
                            icon={SettingsVoice}
                            onClick={() => setIsVoiceRecorderOpen(true)}
                            tooltip="Record Candidate's Answer"
                        />
                        <IconContainer
                            className="mr-2"
                            icon={FileAudio}
                            onClick={() => setShowRecordingModal(true)}
                            tooltip='Candidate Voice Recordings'
                        />
                        <IconContainer
                            icon={Attachment}
                            onClick={() => setShowAttachmentModal(true)}
                            tooltip='Candidate Attachments'
                        />
                    </div>
                </FlexBox>
                {
                    detailedSubmission.answers?.map((answer: any, ansInx: number) => {
                        return (activeSubmission === ansInx ||
                            activeSubmission === -1) &&
                            (activeSubmission === -1 && !ansInx ?
                                null :
                                <div key={answer.answer._id + ansInx}>
                                    {activeSubmission === -1 && <SubmissionHeader key={answer._id} >
                                        {'Submission' + (detailedSubmission.answers?.length - ansInx)}
                                        <SmallSpan>
                                            <Moment format="MMM DD,YYYY">
                                                {answer.answer.createdAt}
                                            </Moment>
                                        </SmallSpan>
                                    </SubmissionHeader>}
                                    {detailedSubmission.answers[activeSubmission].answer?.candidateTrackId && <AnswerWrapper expertId={expert.expertId}
                                        answer={answer}
                                        candidateTrackId={detailedSubmission.answers[activeSubmission].answer?.candidateTrackId}
                                        questionId={detailedSubmission.question._id} />}
                                    {detailedSubmission.answers[activeSubmission].feedbacks?.map((feedback: FeedbackWithActive, fi: number) => {
                                        feedback.isActive = true;
                                        feedback.evaluatedCapabilities.forEach((ec: EvaluatedCapabilityWithActive) => {
                                            ec.isActive = true;
                                            ec.evals.forEach((ev: EvalWithActive) => {
                                                if (ev.evalTextFeedback)
                                                    ev.isActive = true
                                            });
                                        });

                                        return <>
                                            <FeedbackComponent
                                                handleSliderChange={(val: number, capabilityId: string, evalId: string) => handleSliderChange(ansInx, fi, val, capabilityId, evalId)}
                                                historySketchData={historySketchData}
                                                editable={!feedback.feedbackStatus || ((feedback?.feedbackStatus === FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT ||
                                                    feedback?.feedbackStatus === FEEDBACK_TYPES.EXPERT_REVIEWING_RESPONSE) &&
                                                    feedback?.expertId === expert.expertId
                                                    && activeSubmission !== -1)}
                                                key={feedback._id + fi}
                                                {...feedback}
                                                questionAnswerId={detailedSubmission.question._id}
                                                onExpandEval={(capabilityId: string, evalId: string, isActive: boolean) => onExpandEval(capabilityId, evalId, isActive, ansInx, fi)}
                                                handleCommentChange={(val: string, capabilityId: string, evalId: string) => handleCommentChange(ansInx, fi, val, capabilityId, evalId)}
                                                handleFeedbackchange={(value: string) => handleFeedbackchange(ansInx, fi, value)}
                                                placeholder={detailedSubmission.answers[activeSubmission].answer.containRecording ? "This answer contains recording" : null}
                                            /></>
                                    }
                                    )}
                                </div>)
                    }
                    )
                }
                {!readonly &&
                    (!detailedSubmission.answers[activeSubmission].feedbacks[0]?.feedbackStatus ||
                        ((detailedSubmission.answers[activeSubmission].feedbacks[0]?.feedbackStatus === FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT
                            || detailedSubmission.answers[activeSubmission].feedbacks[0]?.feedbackStatus === FEEDBACK_TYPES.EXPERT_REVIEWING_RESPONSE)
                            && activeSubmission !== -1)
                    )
                    && <FlexBox className="flex-row-reverse">
                        <Col className="d-flex align-items-center">
                            <AppButton
                                onClick={() => handleSaveFeedback()}
                            >
                                {isSaving && <Spinner
                                    className="mr-2 mt-2 mb-2"
                                    color={'#000'}
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />}
                                {isSaving ? 'Saving...' : 'Save'}
                            </AppButton>
                        </Col>
                    </FlexBox>}
                <ModalComponent
                    handleClose={() => setShowAttachmentModal(false)}
                    show={showAttachmentModal}
                    showCloseIcon={true}
                    header={'Attachments'}
                >
                    {detailedSubmission.question.capabilities[0] && <CandidateAttachments candidateId={candidateId} capabilityId={detailedSubmission.question.capabilities[0].capabilityId} questionId={detailedSubmission.question._id} expertId={expert.expertId} version={"" + (detailedSubmission.answers?.length || 1)} />}
                </ModalComponent>
                <ModalComponent
                    handleClose={() => setShowRecordingModal(false)}
                    show={showRecordingModal}
                    showCloseIcon={true}
                    header={'Candidate Recordings'}
                >
                    {detailedSubmission.question.capabilities[0] && <CandidateRecordings candidateId={candidateId} capabilityId={detailedSubmission.question.capabilities[0].capabilityId} questionId={detailedSubmission.question._id} version={"" + (detailedSubmission.answers?.length || 1)} expertId={expert.expertId} />}
                </ModalComponent>
                <ModalComponent
                    handleClose={() => setShowSampleSolutionsModal(false)}
                    show={showSampleSolutionsModal}
                    showCloseIcon={true}
                    header={'Sample Solution'}
                >
                    {questionSampleSolutions ? <SampleSolutions
                        sampleSolutions={questionSampleSolutions} /> : null}
                </ModalComponent>
                <ModalComponent
                    handleClose={() => setShowQuestionHintsModal(false)}
                    show={showQuestionHintsModal}
                    showCloseIcon={true}
                    header={'Question Hints'}
                >
                    {questionHints ? <QuestionHints
                        hints={questionHints} /> : null}
                </ModalComponent>
                <ModalComponent
                    className={isRecordingMinimized ? "minimize-css" : ""}
                    backdropClassName={isRecordingMinimized ? "minimize-css" : ""}
                    isStatic={true}
                    handleClose={handleVoiceRecorderClose}
                    show={isVoiceRecorderOpen}
                    headerComponent={
                        <div className="w-100 h4 d-flex justify-content-center align-items-center flex-column">
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <span>{'Audio/Video Recorder'}</span>
                                <IconContainer tooltip="Minimize" onClick={handleMinimize} icon={WindowMinimize} />
                            </div>
                            <div className="h6 mt-2 text-muted"><strong>{'Tip: '}</strong>{'You may need to optimize your recordings if it exceeds 3 minutes'}</div>
                        </div>}
                >
                    <AudioRecorder readonly={readonly} handleCancel={handleVoiceRecorderClose} handleSubmit={handleVoiceRecorderSubmit} directory={recordingDirectory || ""}
                        expertId={expert.expertId} />
                </ModalComponent>
            </QuestionContainer ></> : <></>
    )
}
