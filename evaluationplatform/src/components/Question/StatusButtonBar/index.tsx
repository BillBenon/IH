import React from 'react';
import { StatusButton } from './StatusButton';
import { QUESTION_STATUS_TEXT } from 'utilities/constants';
import styled from 'styled-components';

const StyledStatusButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

interface IProps {
  capabilitiyStatus: {
    numberOfQuestions: number;
    noOfQuestionAttepmted: number;
    unAnswered: number;
    savedAnswers: number;
    sendForReview: number;
    underReview: number;
    feedbackViewed: number;
    underFeedBackLoop: number;
    feedBackRecevied: number;
  };
  setQuestionFilter: Function;
  questionFilter: string;
}

export const StatusButtonBar: React.FC<IProps> = (props) => {
  const capabilitiyStatus = props.capabilitiyStatus;
  return (
    <StyledStatusButtonBar>
      <StatusButton
        active  = {props.questionFilter === QUESTION_STATUS_TEXT.UNANSWERED}
        questionFilter={props.questionFilter}
        onClick={() => props.setQuestionFilter(QUESTION_STATUS_TEXT.UNANSWERED)}
        status={QUESTION_STATUS_TEXT.UNANSWERED}
      >
        Unanswered: {capabilitiyStatus?.unAnswered || 0}
      </StatusButton>
      <StatusButton
        active={props.questionFilter === QUESTION_STATUS_TEXT.ANSWERED}
        questionFilter={props.questionFilter}
        onClick={() => props.setQuestionFilter(QUESTION_STATUS_TEXT.ANSWERED)}
        status={QUESTION_STATUS_TEXT.ANSWERED}
      >
        In progress: {capabilitiyStatus?.savedAnswers || 0}
      </StatusButton>
      <StatusButton
        active={props.questionFilter === QUESTION_STATUS_TEXT.SUBMITTED_FOR_REVIEW}
        questionFilter={props.questionFilter}
        onClick={() => props.setQuestionFilter(QUESTION_STATUS_TEXT.SUBMITTED_FOR_REVIEW)}
        status={QUESTION_STATUS_TEXT.SUBMITTED_FOR_REVIEW}
      >
        Submitted: {capabilitiyStatus?.sendForReview || 0}
      </StatusButton>
      <StatusButton
        active={props.questionFilter === QUESTION_STATUS_TEXT.UNDER_REVIEW}
        questionFilter={props.questionFilter}
        onClick={() => props.setQuestionFilter(QUESTION_STATUS_TEXT.UNDER_REVIEW)}
        status={QUESTION_STATUS_TEXT.UNDER_REVIEW}
      >
        Under Review: {capabilitiyStatus?.underReview || 0}
      </StatusButton>
      <StatusButton
        active={props.questionFilter === QUESTION_STATUS_TEXT.FEEDBACK_RECEIVED}
        questionFilter={props.questionFilter}
        onClick={() => props.setQuestionFilter(QUESTION_STATUS_TEXT.FEEDBACK_RECEIVED)}
        status={QUESTION_STATUS_TEXT.FEEDBACK_RECEIVED}
      >
        Feedback Received: {capabilitiyStatus?.feedBackRecevied || 0}
      </StatusButton>
      <StatusButton
        active={props.questionFilter === 'All'}
       questionFilter={props.questionFilter} onClick={() => props.setQuestionFilter('All')} status="All">
        All: {capabilitiyStatus?.numberOfQuestions || 0}
      </StatusButton>
    </StyledStatusButtonBar>
  );
};
