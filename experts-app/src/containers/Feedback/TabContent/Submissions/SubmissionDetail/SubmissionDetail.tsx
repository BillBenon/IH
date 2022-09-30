import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import React, { useEffect, useRef, useState } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import Collapse from 'react-bootstrap/esm/Collapse';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { Attachment } from 'styled-icons/entypo';
import { FileAudio } from "@styled-icons/fa-solid";
import {
    getQuestionHints,
    getQuestionSampleSolutions,
} from '../../../../../actions/expert/query/submission/submissionActions';
import { AppButton } from '../../../../../components/Common/AppButton';
import { AppLink } from '../../../../../components/Common/AppLink';
import RichTextEditor from '../../../../../components/Common/Editors/RichTextEditor';
import { IconContainer } from '../../../../../components/Common/IconContainer/IconContainer';
import { QueryTabs } from '../../../../../components/Expert/Feedback/QueryTabs';
import { ModalComponent } from '../../../../../components/Modals/Modal';
import { RootState } from '../../../../../store';
import { getSketchDataCopyFromArray } from '../../../../../utilities';
import { FEEDBACK_TYPES } from '../../../../../utilities/constants';
import { CapabilityId } from '../../../IFeedback';
import { Chip, ChipWrapper, QuestionDiv, SmallSpan } from '../Submissions.styles';
import useSubmissions from '../Submissions.utils';
import AnswerWrapper from './AnswerWrapper';
import { CandidateAttachments } from './CandidateAttachments';
import { CandidateRecordings } from './CandidateRecordings';
import { FeedbackComponent } from './Feedback';
import { AnswerWithActive, Feedback, FeedbackWithActive } from './ISubmissionDetail';
import { QuestionHints } from './QuestionHints';
import { SampleSolutions } from './SampleSolutions';
import {
    CollapseLink,
    CustomDropup,
    FlexBox,
    LinkWrapper,
    QuestionContainer,
    QuestionLinks,
    SubmissionHeader,
} from './SubmissionDetail.styles';
import useSubmissionDetail from './SubmissionDetail.utils';

export const SubmissionDetail: React.FC<any> = (props) => {
    const dispatch = useDispatch();
    const [showSampleSolutionsModal, setShowSampleSolutionsModal] = useState(false);
    const [showAttachmentModal, setShowAttachmentModal] = useState(false);
    const [showRecordingModal, setShowRecordingModal] = useState(false);
    const [showQuestionHintsModal, setShowQuestionHintsModal] = useState(false);
    const [{ getQuestionTitleByQuestionId, setSubmissionStatus, setFilterCount }] = useSubmissions();
    const { questionHints, questionSampleSolutions } = useSelector((state: RootState) => state.submission);
    const [{
        activeCard,
        expandedCards,
        invalidSubmission,
        loading,
        handleSubmitFeedback,
        getDetailedSubmissions,
        getCapabilityByCapabilityId,
        loadingSubmissionDetails,
        expert,
        activeTab,
        handleTabClick,
        handleCurrentCapability,
        showCapabilityModal,
        currentCapability,
        setShowCapabilityModal,
        detailedSubmission,
        handleLastThreeTabs,
        handleCardExpandCollapse,
        handleActiveCard,
        handleMarkedText,
        currentQuery,
    }] = useSubmissionDetail();

    const handleShowQuestionHintsModal = (value: boolean, questionId: string) => {
        setShowQuestionHintsModal(value);
        dispatch(getQuestionHints({ questionId, candidateTrackId: props.latestAnswer.candidateTrackId, expertId: expert.expertId }));
    }

    const handleShowSampleSolutionsModal = (value: boolean, questionId: string) => {
        setShowSampleSolutionsModal(value);
        dispatch(getQuestionSampleSolutions({ questionId, candidateTrackId: props.latestAnswer.candidateTrackId, expertId: expert.expertId }));
    }

    const handleViewSubmission = () => {
        getDetailedSubmissions(props.questionId, props.latestAnswer.candidateTrackId);
    }
    const questiondiv = useRef(null);

    const activeAnswers = detailedSubmission[props.latestAnswer.questionAnswerId]?.answers;

    const historySketchData = getSketchDataCopyFromArray(activeAnswers);

    const activeIndex = activeAnswers?.findIndex((ans: AnswerWithActive) => ans.isActive);

    const activeFeedback = activeAnswers?.find((ans: AnswerWithActive) => ans.isActive)?.feedbacks?.find((fd: FeedbackWithActive) => fd.isActive);

    const lastThreeTabs = handleLastThreeTabs(activeAnswers)?.map((qindex: number) => { return { name: "" + (activeAnswers?.length - qindex), identifier: qindex }; });

    useEffect(() => {
        if (activeFeedback?.questionAnswerId === props.latestAnswer.questionAnswerId && props.status !== activeFeedback?.feedbackStatus) {
            setFilterCount(props.status, activeFeedback.feedbackStatus)
            setSubmissionStatus(activeFeedback.questionAnswerId, activeFeedback.feedbackStatus);
        }
    }, [activeFeedback?.feedbackStatus])

    return (
        <>
            <Collapse in={!expandedCards[activeTab] || !expandedCards[activeTab][props.latestAnswer.questionAnswerId]}>
                <QuestionContainer id={"questionContainer"}>
                    {props?.children}
                    <AppButton variant="primary" onClick={() => { handleActiveCard(props.latestAnswer.questionAnswerId); handleViewSubmission(); }}
                        aria-controls={"questionContainer submissionDetail"}>
                        {activeCard === props.latestAnswer.questionAnswerId && loadingSubmissionDetails ? <Spinner
                            className="mr-2 mt-2 mb-2"
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : null}
                        {'View Submission'}
                    </AppButton>
                </QuestionContainer>
            </Collapse>
            {expandedCards[activeTab] && expandedCards[activeTab][props.latestAnswer.questionAnswerId] &&
                <Collapse in={expandedCards[activeTab][props.latestAnswer.questionAnswerId]}>
                    <QuestionContainer id={"submissionDetail"}>
                        <QuestionDiv>{'Q) ' + getQuestionTitleByQuestionId(props.questionId)}</QuestionDiv>
                        <RichTextEditor
                            value={detailedSubmission[props.latestAnswer.questionAnswerId]?.questionDetail?.description}
                            disabled={true}
                            id={props.questionId}
                            placeholder='Question should appear here...'
                        />
                        <QuestionLinks>
                            <ChipWrapper>
                                {props.capabilityIds?.map((capability: CapabilityId, ci: number) => <Chip onClick={() => handleCurrentCapability(capability.id)} key={capability.id + ci} theme={{ color: "#171414", backgroundcolor: "#E5E0DF" }}>{capability.name}</Chip>)}
                            </ChipWrapper>
                            <LinkWrapper>
                                {detailedSubmission[props.latestAnswer.questionAnswerId]?.questionDetail?.hintsAvailable && <AppLink onClick={() => handleShowQuestionHintsModal(true, props.questionId)} variant="link">{'Question Hints'}</AppLink>}
                                {detailedSubmission[props.latestAnswer.questionAnswerId]?.questionDetail?.sampleSolutionsAvailable && <AppLink onClick={() => handleShowSampleSolutionsModal(true, props.questionId)} variant="link">{'Sample Solutions'}</AppLink>}
                            </LinkWrapper>
                        </QuestionLinks>
                        <FlexBox>
                            <QueryTabs
                                summaryTab={activeAnswers?.length > 2}
                                precedingText="Submission"
                                tabDetails={lastThreeTabs}
                                activeIndex={activeIndex !== -1 ? activeIndex : undefined}
                                handleClick={(e: any, index: number) => handleTabClick(e, index, props.latestAnswer.questionAnswerId)}
                            />
                            <div className='d-flex'>
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
                                <CollapseLink onClick={() => handleCardExpandCollapse(props.latestAnswer.questionAnswerId)} variant="link">{'Collapse '}< CustomDropup /></CollapseLink>
                            </div>
                        </FlexBox>
                        {activeAnswers?.map((answer: any, oindex: number) => {
                            return (activeIndex === oindex ||
                                activeIndex === -1) &&
                                (activeIndex === -1 && !oindex ?
                                    null :
                                    <div key={answer.answer._id + oindex}>
                                        {activeIndex === -1 && <SubmissionHeader key={answer._id} >
                                            {'Submission' + (activeAnswers?.length - oindex)}
                                            <SmallSpan>
                                                <Moment format="MMM DD,YYYY">
                                                    {answer.answer.createdAt}
                                                </Moment>
                                            </SmallSpan>
                                        </SubmissionHeader>}
                                        <AnswerWrapper expertId={expert.expertId}
                                            answer={answer}
                                            candidateTrackId={props.latestAnswer.candidateTrackId}
                                            questionId={props.questionId} />
                                        {answer.feedbacks?.map((feedback: Feedback, fi: number) =>
                                            <FeedbackComponent
                                                historySketchData={historySketchData}
                                                editable={(feedback?.feedbackStatus === FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT ||
                                                    feedback?.feedbackStatus === FEEDBACK_TYPES.EXPERT_REVIEWING_RESPONSE) &&
                                                    feedback?.expertId === expert.expertId &&
                                                    expert.lastActivity?.saveQueries[activeTab].fixedQuery !== 'FEEDBACKSENT'
                                                    && activeIndex !== -1}
                                                key={feedback._id + fi}
                                                {...feedback}
                                                questionAnswerId={feedback?.questionAnswerId}
                                                getCapabilityByCapabilityId={getCapabilityByCapabilityId}
                                            />
                                        )}
                                    </div>)
                        }
                        )}
                        <FlexBox className="flex-row-reverse">
                            <CollapseLink onClick={() => handleCardExpandCollapse(props.latestAnswer.questionAnswerId)} variant="link">{'Collapse '}< CustomDropup /></CollapseLink>
                            {(activeFeedback?.feedbackStatus === FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT ||
                                activeFeedback?.feedbackStatus === FEEDBACK_TYPES.EXPERT_REVIEWING_RESPONSE) &&
                                currentQuery !== 'FEEDBACKSENT' &&
                                activeFeedback?.expertId === expert.expertId ?
                                <Col className="d-flex align-items-center">
                                    <AppButton
                                        key={activeFeedback?.feedbackId}
                                        onClick={() => handleSubmitFeedback(activeFeedback)}
                                    >
                                        {activeCard === props.latestAnswer.questionAnswerId && loading ? <Spinner
                                            className="mr-2 mt-2 mb-2"
                                            color={'#000'}
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> : null}
                                        {activeCard === props.latestAnswer.questionAnswerId && loading ? 'Saving...' : 'Submit to Candidate'}
                                    </AppButton>
                                    {!!invalidSubmission[props.latestAnswer.questionAnswerId] &&
                                        <Col style={{ display: "grid" }}>
                                            {!!invalidSubmission[props.latestAnswer.questionAnswerId].eval?.length && <small className="text-danger smaller">{"Comment is required for 'Partially Knows' Evaluations."}</small>}
                                            {!!invalidSubmission[props.latestAnswer.questionAnswerId].feedback?.length && <small className="text-danger smaller">{'Feedback is required for Submission.'}</small>}
                                        </Col>}
                                </Col>
                                :
                                null
                            }
                        </FlexBox>
                        <ModalComponent
                            handleClose={() => setShowAttachmentModal(false)}
                            show={showAttachmentModal}
                            showCloseIcon={true}
                            header={'Attachments'}
                        >
                            <CandidateAttachments candidateId={props.candidateId} capabilityId={props.capabilityIds[0].id} questionId={props.questionId} expertId={expert.expertId}
                                version={(activeAnswers.length - activeIndex) || 1} />
                        </ModalComponent>
                        <ModalComponent
                            handleClose={() => setShowRecordingModal(false)}
                            show={showRecordingModal}
                            showCloseIcon={true}
                            header={'Candidate Recordings'}
                        >
                            <CandidateRecordings candidateId={props.candidateId} capabilityId={props.capabilityIds[0].id} questionId={props.questionId} version={(activeAnswers.length - activeIndex) || 1}
                                expertId={expert.expertId} />
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
                            show={showCapabilityModal}
                            handleClose={() => setShowCapabilityModal(false)}
                            showCloseIcon={true}
                            header={currentCapability?.name as string}
                            body={currentCapability?.description}
                        />
                    </QuestionContainer>
                </Collapse>}
        </>
    );
};