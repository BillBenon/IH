import { ModalComponent } from 'components/Common/Modal/Modal';
import { ResumeReview } from 'containers/ResumeReview';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import { getAvailableSharedQuestion, keepResumeSelectionOpen } from 'store/evaluationPlatform';
import styled from 'styled-components';
import { getEnrollmentType, isPlacementTrack } from 'utilities/helperFunctions';
import { QuestionField, StatusButtonBar, TracksDescription } from '../../components';

const StyledQuestionContainer = styled.div`
  margin-top: 57px;
  padding-top: 44px;
  overflow: auto;
  display: flex;
  background: white;
  margin-left: ${(props: any) => (props.isMaximizeContent ? '0px' : '363px')};
  width: ${(props: any) => (props.isMaximizeContent ? '100%' : 'calc(100% - 285px)')};
  transition: 1s;
  flex-direction: column;
  padding-left: 40px;
  padding-right: 100px;
  align-items: center;
  padding-top: 44px;
  .capability__title {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .question__status__bar {
    margin-top: 28px;
    padding-left: 48px;
    width: -webkit-fill-available;
  }
  .question__main {
    width: -webkit-fill-available;
  }
`;

interface IProps {
  isMaximizeContent: boolean;
  candidateTrackId: string;
  capability: any;
  handleMaximizeContent: any;
  setCapability: any;
  selectedCapabilityId: string;
  setAnswer: any;
  saveResponseForQuestionOfCandidateTrack: any;
  Modal: any;
  setQuestionId: any;
  currentQuestionId: string;
  submitResponseToExpert: any;
  setFeedback: any;
  handleEdit: any;
  setQuestionFeedbackViewed: Function;
  candidateViewedExpertFeedback?: Function;
  candidate: any;
  setCurrentAnsVersionId: Function,
  saveCandidateLastActivity: Function,
  goToPaymentPage: Function,
  triggerFeedback: any;
  setTriggerFeedback: any;
  resumeSelectionOpen?: boolean;
  keepResumeSelectionOpen?: any;
  trackPlan?: string;
}

const _QuestionContainer: React.FC<IProps> = (props) => {
  let capabilityId = props.selectedCapabilityId || '';
  let currentCapability = props.capability?.filter((item: any) => item.capabilityId === capabilityId)[0];
  const description = currentCapability?.description;
  const capabilityName = currentCapability?.capabilityName;
  const capabilitiyStatus = currentCapability?.capabilityStatus;
  let questions = currentCapability?.questions;
  let capScrollPosition = currentCapability?.scrollPosition?.scrollTop || 0;
  const [questionFilter, setQuestionFilter] = useState('All');
  const [resumeUrl, setResumeUrl] = useState<string | undefined>();
  const [minimizeRecording, setMinimizeRecording] = useState<string | undefined>('-1');
  const [openRecorder, setOpenRecorder] = useState<string>('-1');
  const dispatch = useDispatch();

  useEffect(() => {
    setQuestionFilter('All');
    questions = currentCapability?.questions;
    // eslint-disable-next-line
  }, [props.selectedCapabilityId, currentCapability]);

  useEffect(() => document.documentElement.scrollTo(0, capScrollPosition), [props.selectedCapabilityId])

  const getQuestionIdx = (question: any) => {
    return currentCapability?.questions.map((question: any) => question.question._id).indexOf(question.question._id);
  }

  const getSharedQuestions = (questions: any) => {
    const payload = {
      questionIds: questions.map((q: any) => q.question._id),
      candidateTrackId: props.candidateTrackId,
    };
    dispatch(getAvailableSharedQuestion(payload));
  }

  useEffect(() => {
    questions && getSharedQuestions(questions);
  }, [questions])

  const handleMiniMizeRecording = (idx: string) => {
    if (typeof (idx) === 'string') {
      setMinimizeRecording(idx)
      document.body.style.overflow = "auto";
    }
  }

  const handleOpenRecording = (idx: string) => {
    if (typeof (idx) === 'string') {
      setOpenRecorder(idx);
    }
  }

  const CapabilityTitle = () => <div className="capability__title">{capabilityName}</div>;
  return (
    <StyledQuestionContainer {...props}>
      <CapabilityTitle />
      <div id={'searchComPortalDiv'}></div>
      <TracksDescription description={description} />
      <div className="question__status__bar">
        <StatusButtonBar
          capabilitiyStatus={capabilitiyStatus}
          setQuestionFilter={setQuestionFilter}
          questionFilter={questionFilter}
        />
      </div>
      <div className="question__main">
        {questions &&
          questions
            .filter((item: any) => {
              if (questionFilter !== 'All') return item.question?.status === questionFilter;
              return true;
            })
            .map((question: any, idx: number) => {
              return (
                <QuestionField
                  idx={getQuestionIdx(question)}
                  key={idx}
                  candidateTrackId={props.candidateTrackId}
                  capabilityId={capabilityId}
                  questionSet={question}
                  handleMaximizeContent={props.handleMaximizeContent}
                  isMaximizeContent={props.isMaximizeContent}
                  setAnswer={props.setAnswer}
                  saveResponseForQuestionOfCandidateTrack={props.saveResponseForQuestionOfCandidateTrack}
                  Modal={props.Modal}
                  setQuestionId={props.setQuestionId}
                  currentQuestionId={props.currentQuestionId}
                  submitResponseToExpert={props.submitResponseToExpert}
                  setFeedback={props.setFeedback}
                  handleEdit={props.handleEdit}
                  setQuestionFeedbackViewed={props.setQuestionFeedbackViewed}
                  candidateViewedExpertFeedback={props.candidateViewedExpertFeedback}
                  candidate={props.candidate}
                  setCurrentAnsVersionId={props.setCurrentAnsVersionId}
                  saveCandidateLastActivity={props.saveCandidateLastActivity}
                  goToPaymentPage={props.goToPaymentPage}
                  triggerFeedback={props.triggerFeedback}
                  setTriggerFeedback={props.setTriggerFeedback}
                  handleAnswerShare={() => getSharedQuestions(questions)}
                  setMinimizeRecording={(ind?: string) => handleMiniMizeRecording(ind ? ind : question?.question._id + idx)}
                  minimizedModelIndex={minimizeRecording}
                  currModelIndex={question?.question._id + idx}
                  openRecorder={openRecorder}
                  setOpenRecorder={(ind: string) => handleOpenRecording(ind)}
                />
              );
            })}
      </div>
      {getEnrollmentType() && isPlacementTrack() && props.resumeSelectionOpen &&
        <ModalComponent
          handleClose={() => props.keepResumeSelectionOpen(false)}
          show={props.resumeSelectionOpen}
          footer={
            <div>
              <Button type="button" variant="secondary" className="mx-2" onClick={() => props.keepResumeSelectionOpen(false)}>
                {'Skip'}
              </Button>
              <Button type="button" onClick={() => props.keepResumeSelectionOpen(false)}>{'Continue'}</Button>
            </div>
          }>
          <div>
            <div className="h5 m-3 text-center">
              <span>{'Select Resume'}</span>
            </div>
            <ResumeReview resumeUrl={resumeUrl} setResumeUrl={setResumeUrl} />
          </div>
        </ModalComponent>}
    </StyledQuestionContainer>
  );
};

const mapStateToProps = (state: any) => ({
  resumeSelectionOpen: state.evaluationPlatform?.resumeSelectionOpen,
  trackPlan: state.payment?.trackPlan
});

const mapDispatchToProps: any = {
  keepResumeSelectionOpen
};

export const QuestionContainer = connect(mapStateToProps, mapDispatchToProps)(_QuestionContainer);