import { AnswerBottom, AnswerField, FeedbackField, MetricsField } from 'components';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledAnswerSet = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  & > * {
    margin-bottom: 18px;
  }
`;

interface IProps {
  idx: number;
  candidateTrackId: string;
  capabilityId: string;
  questionId: string;
  answer: any;
  handleMaximizeContent?: any;
  isMaximizeContent: boolean;
  setAnswer: any;
  saveResponseForQuestionOfCandidateTrack: any;
  isSaved: boolean;
  setIsSaved: any;
  questionStatusText: string;
  setQuestionStatusText: any;
  submitResponseToExpert: any;
  question: any;
  setFeedback: any;
  handleEdit: any;
  answerVersion: number;
  setQuestionId: Function,
  triggerFeedback: any;
  setTriggerFeedback: any;
  questionInfo?: any
  handleAnswerShare?: () => void;
  communityVersion?: boolean;
  isMeetingView?: boolean;
  expertName?: string;
  totalAnswerVersions: number;
  setMinimizeRecording?: Function;
  minimizedModelIndex?: string;
  currModelIndex?: string;
  openRecorder: string;
  setOpenRecorder: any;
}

const getAnswerFeedbackStatus = (props: any): string => {
  if (props.answer === null || (
    props.answer &&
    !props.answer?.answer?.sketchAvailable &&
    props.answer?.answer?.answer === '' &&
    props.answer?.answer?.codeAnswer === '')) {
    return 'UNANSWERED';
  } else if ((props.answer?.answer?.sketchAvailable || props.answer?.answer?.answer !== '' || props.answer?.answer?.codeAnswer !== '') && props.answer?.feedbacks?.length === 0) {
    return 'ANSWERED';
  } else if (props.answer?.feedbacks && props.answer?.feedbacks[0]?.feedbackStatus === 'RESPONSE_IS_SUBMITTED_TO_EXPERT') {
    return 'SEND_FOR_REVIEW';
  } else if (props.answer?.feedbacks && props.answer?.feedbacks[0]?.feedbackStatus === 'EXPERT_REVIEWING_RESPONSE') {
    return 'UNDER_REVIEW';
  } else if (props.answer?.feedbacks && props.answer?.feedbacks[0]?.feedbackStatus === 'EXPERT_GIVES_FEEDBACK') {
    return 'FEEDBACK_RECEIVED';
  } else if (props.answer?.feedbacks && props.answer?.feedbacks[0]?.feedbackStatus === 'FEEDBACK_VIEWED_BY_CANDIDATE') {
    return 'FEEDBACK_VIEWED_BY_CANDIDATE';
  }
  return 'UNANSWERED';
};

export const AnswerSet: React.FC<IProps> = (props) => {
  const [answerStatus, setAnswerStatus] = useState<string>("");
  const [feedback, setFeedback] = useState<any>();

  useEffect(() => {
    let astatus = getAnswerFeedbackStatus(props);
    setAnswerStatus(astatus);
    let feedbackIdx = _.findIndex(props.answer?.feedbacks, (feedbackItem: any) => {
      return feedbackItem.questionAnswerId === props.answer?.answer?._id;
    });
    let fb = feedbackIdx > -1 && props.answer?.feedbacks[feedbackIdx];
    setFeedback(fb);
  }, [props.answer])

  return (
    <StyledAnswerSet>
      <AnswerField
        questionInfo={props.questionInfo}
        key={`${props.answerVersion}`}
        textId={`${props.questionId}-${props.idx}`}
        handleMaximizeContent={props.handleMaximizeContent}
        isMaximizeContent={props.isMaximizeContent}
        candidateTrackId={props.candidateTrackId}
        capabilityId={props.capabilityId}
        questionId={props.questionId}
        answer={props.answer}
        setAnswer={props.setAnswer}
        saveResponseForQuestionOfCandidateTrack={props.saveResponseForQuestionOfCandidateTrack}
        isSaved={props.isSaved}
        setIsSaved={props.setIsSaved}
        questionStatusText={props.questionStatusText}
        setQuestionStatusText={props.setQuestionStatusText}
        question={props.question}
        answerStatus={answerStatus}
        answerVersion={props.answerVersion}
        totalAnswerVersions={props.totalAnswerVersions}
        setQuestionId={props.setQuestionId}
        handleAnswerShare={props.handleAnswerShare}
        isMeetingView={props.isMeetingView}
        setMinimizeRecording={props.setMinimizeRecording}
        minimizedModelIndex={props.minimizedModelIndex}
        currModelIndex={props.currModelIndex}
        openRecorder={props.openRecorder}
        setOpenRecorder={props.setOpenRecorder}
      />
      {feedback && <FeedbackField
        candidateTrackId={props.candidateTrackId}
        questionTitle={props.question?.title}
        expertName={props.expertName}
        feedback={feedback} />}
      {feedback && (
        <MetricsField feedback={feedback} capabilityId={props.capabilityId} isMeetingView={props.isMeetingView} />
      )}
      {!props.communityVersion && !props.isMeetingView && !!props.answer && <AnswerBottom
        id={`${props.questionId}-${props.idx}`}
        candidateTrackId={props.candidateTrackId}
        capabilityId={props.capabilityId}
        questionId={props.questionId}
        answer={props.answer}
        questionStatusText={props.questionStatusText}
        setQuestionStatusText={props.setQuestionStatusText}
        submitResponseToExpert={props.submitResponseToExpert}
        question={props.question}
        setFeedback={props.setFeedback}
        handleEdit={props.handleEdit}
        answerStatus={answerStatus}
        triggerFeedback={props.triggerFeedback}
        setTriggerFeedback={props.setTriggerFeedback}
      />}
    </StyledAnswerSet>
  );
};
