import React, { useState, useEffect } from 'react';
import { Sidebar, MainHeader, TreeSidebar, QuestionContainer } from 'containers';
import { get } from 'lodash';
import { css } from '@emotion/core';
import { connect, useDispatch } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import {
  setCapability,
  saveResponseForQuestionOfCandidateTrack,
  setAnswer,
  setQuestionId,
  submitResponseToExpert,
  setFeedback,
  handleEdit,
  setAllFeedbacks,
  setQuestionFeedbackViewed,
  candidateViewedExpertFeedback,
  getDetailsForCandidatebyCandidateTrackId,
  getAnswerStatus,
  setCurrentAnsVersionId,
  saveCandidateLastActivity,
  setScrollPosition,
  createCandidateTrackForCandidate,
  getDetailsForCandidateByCandidateAndTrackId
} from 'store/evaluationPlatform';
import { DEFAULT_TOKEN, DEFAULT_GET_ANS_STATUS_TIME, Expert_Session_Id, Candidate_Track_Id, Candidate_Id, ConfigTypes, Expert_Login } from 'utilities/constants';
import Modal from 'react-modal';
import styled from 'styled-components';
import { IGetAnswerStatusRequest, IQuestionAnswerRequest } from 'types';
import { useSnackbar } from 'notistack';
import { setTrackInfoForPayment } from 'store/payment';
import { notEmpty, post } from 'utilities';
import { SuccessPayment } from 'containers/PlanAndPayment/PaymentAcknowledgement/successPayment';
import { useMessagePopup } from 'context/messagePopup';
import { useLocation } from 'react-router';
import queryString from 'query-string'
import { useAppDispatch } from 'store';
import { getValueBrowserStorage, setValueBrowserStorage } from 'services/browserStorageService';
import { OnboardingModal } from 'components/OnboardingModal';
const API_PREFIX = 'evaluationPlatform';

Modal.setAppElement(`#root`);

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  display: block;
`;

const StyledQuestionPage = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  .content {
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    z-index: 100;
    position: fixed;
    width: 100%;
  }
  .main {
    overflow: hidden;
    margin-top: 57px;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: auto;
    min-height: 100%;
  }
`;

const QuestionPage = (props: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const trackName = get(props.currentTrack, 'candidateTrack[0].title');
  const { candidateTrackId } = props;
  const category = get(props.currentTrack, 'candidateTrack[0].category');
  const capability = get(props.currentTrack, 'candidateTrack[0].capabilities');
  let [isMaximizeContent, setMaximizeContent] = useState(false);
  const [triggerFeedback, setTriggerFeedback] = useState<ITriggerFeedback>();
  const dispatch = useDispatch();
  const storeDispatch = useAppDispatch()
  const handleMaximizeContent = () => {
    setMaximizeContent(!isMaximizeContent);
  };
  const { completePaymentAcknowledgement } = SuccessPayment();
  const message = useMessagePopup();
  const { search } = useLocation();
  const _queryParams: any = queryString.parse(search);
  const currentCandidateId = getValueBrowserStorage(Candidate_Id);
  const expertLogin = (getValueBrowserStorage(Expert_Login) == null) ? false : true;
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);

  useEffect(() => {
    completeOngoingPayment();
    if (expertLogin) {
      setShowOnboardingModal(false);
    }

  }, []);

  useEffect(() => {
    if (currentCandidateId) {
      getCandidateOnboardingConfig();
    }
  }, []);


  useEffect(() => {
    const savedCandidateTrackId = getValueBrowserStorage(Candidate_Track_Id);
    const savedCandidateId = getValueBrowserStorage(Candidate_Id);
    if (props.currentTrack === null || props?.currentTrack?.candidate?._id !== savedCandidateId) {
      if (savedCandidateTrackId !== null && savedCandidateTrackId !== 'undefined') {
        if (_queryParams.lptrackid && _queryParams.lpemail) {
          dispatch(getDetailsForCandidateByCandidateAndTrackId({
            token: DEFAULT_TOKEN,
            candidateId: savedCandidateId!,
            trackId: _queryParams.lptrackid
          }))
          enqueueSnackbar("We have issue you a default password and sent you a reset password email in your inbox", {
            variant: 'error',
            autoHideDuration: 2500,
          });
        }
        else if (_queryParams.lptrackid && !_queryParams.lpemail) {
          (storeDispatch(createCandidateTrackForCandidate({
            token: DEFAULT_TOKEN,
            trackId: _queryParams.lptrackid,
            candidateId: savedCandidateId!,
          })) as any).then((response: any) => {
            if (response?.payload?.output) {
              setValueBrowserStorage(
                'candidateTrackId',
                response.payload.output
                  .candidate.lastCandidateSavedSetting.lastCandidateTrackIDWorkedOn
              );
            }
            if (response?.error?.message === "This track is already exists with this username") {
              dispatch(getDetailsForCandidateByCandidateAndTrackId({
                token: DEFAULT_TOKEN,
                candidateId: savedCandidateId!,
                trackId: _queryParams.lptrackid
              }))
            }
            props.history.push('question')
          })
        }
        else {
          props.getDetailsForCandidatebyCandidateTrackId({
            token: DEFAULT_TOKEN,
            candidateTrackId: savedCandidateTrackId,
          });
        }
      }
    }
    else {
      if (props.paymentTrack?.trackId !== get(props.currentTrack, 'candidateTrack[0].trackId')) {
        dispatch(setTrackInfoForPayment({
          trackId: get(props.currentTrack, 'candidateTrack[0].trackId'),
          trackPlan: get(props.currentTrack, 'candidateTrack[0].displayPlanName'),
          trackName: get(props.currentTrack, 'candidateTrack[0].title'),
          planState: get(props.currentTrack, 'candidateTrack[0].planState')
        }));
      }
    }

  }, [capability]);

  const completeOngoingPayment = () => {
    completePaymentAcknowledgement(Expert_Session_Id).then((expertData: any) => {
      if (notEmpty(expertData)) {
        message.load('Payment Successful... Submitting your response');
        setTriggerFeedback({
          expertId: expertData.responseJson.metadata.expertId,
          questionId: expertData.responseJson.metadata.questionId,
          answerId: expertData.responseJson.metadata.answerId
        });
      }
    });
  }

  function updateAnswerStatus() {
    if (!capability || !capability.length) { return; }
    let questionAnswerRequest: IQuestionAnswerRequest[] = [];
    capability?.forEach((capibility: any) => {
      capibility?.questions?.forEach((question: any) => {
        question?.answers.forEach((answer: any) => {
          if (answer?.feedbacks.length > 0 && (
            answer?.feedbacks[0]?.feedbackStatus === 'RESPONSE_IS_SUBMITTED_TO_EXPERT' ||
            answer?.feedbacks[0]?.feedbackStatus === 'EXPERT_REVIEWING_RESPONSE')) {
            let req: IQuestionAnswerRequest = {
              questionId: answer?.answer.questionId,
              questionAnswerId: answer?.answer._id,
              clientFeedbackStatus: answer?.feedbacks[0]?.feedbackStatus,
              clientQuestionAnswerStatus: getAnswerFeedbackStatus(answer),
            };
            questionAnswerRequest.push(req);
          }
        });
      });
    });

    let payload: IGetAnswerStatusRequest = {
      token: DEFAULT_TOKEN,
      questionAnswerRequest: questionAnswerRequest,
    };
    props
      .getAnswerStatus(payload)
      .then((res: any) => {
        if (res.payload?.apiStatus === 'SUCCESS') {
          props.setAllFeedbacks(res);
        } else {
          enqueueSnackbar(res.error?.message, { variant: 'error', autoHideDuration: 2500 });
        }
      })
      .catch((err: any) => {
        enqueueSnackbar(err?.message, {
          variant: 'error',
          autoHideDuration: 2500,
        });
      });
  }

  const getAnswerFeedbackStatus = (props: any): string => {
    if (props.answer === null || (props.answer && props.answer?.answer === '')) {
      return 'UNANSWERED';
    } else if (props.answer?.answer !== '' && props.feedbacks?.length === 0) {
      return 'ANSWERED';
    } else if (props.feedbacks && props.feedbacks[0]?.feedbackStatus === 'RESPONSE_IS_SUBMITTED_TO_EXPERT') {
      return 'SEND_FOR_REVIEW';
    } else if (props.feedbacks && props.feedbacks[0]?.feedbackStatus === 'EXPERT_REVIEWING_RESPONSE') {
      return 'UNDER_REVIEW';
    } else if (props.feedbacks && props.feedbacks[0]?.feedbackStatus === 'EXPERT_GIVES_FEEDBACK') {
      return 'FEEDBACK_RECEIVED';
    } else if (props.feedbacks && props.feedbacks[0]?.feedbackStatus === 'FEEDBACK_VIEWED_BY_CANDIDATE') {
      return 'FEEDBACK_VIEWED_BY_CANDIDATE';
    }
    return 'UNANSWERED';
  };

  const goToPaymentPage = () => {
    props.history.push({
      pathname: '/settings/payments',
    });
  }

  const markAsDone = async () => {
    await post(API_PREFIX + '/setCandidateConfig', { token: DEFAULT_TOKEN, candidateId: currentCandidateId, configs: [{ key: ConfigTypes.CANDIDATE_ON_BOARDING_VIDEO_INFO, value: true }] })
    setShowOnboardingModal(false);
  }

  const getCandidateOnboardingConfig = async () => {
    const result = await post(API_PREFIX + '/getCandidateConfig', { token: DEFAULT_TOKEN, candidateId: currentCandidateId, type: ConfigTypes.CANDIDATE_ON_BOARDING_VIDEO_INFO });
    setShowOnboardingModal(result.output.configs ? !result.output.configs.value : true);
  }

  const goToOnboardingVideo = () => {
    props.history.push('settings/onboarding')
  }


  return (
    <StyledQuestionPage>
      <Sidebar isMaximizeContent={isMaximizeContent} />

      <div className="content">
        <div className="header">
          <MainHeader
            isMaximizeContent={isMaximizeContent}
            handleMaximizeContent={handleMaximizeContent}
            color="#315cd5"
            updateNotificationStatus={updateAnswerStatus}
          />
        </div>
        <div className="main">
          <TreeSidebar
            setScrollPosition={props.setScrollPosition}
            isMaximizeContent={isMaximizeContent}
            trackName={trackName}
            category={category}
            setCapability={props.setCapability}
            setQuestionId={props.setQuestionId}
            setCurrentAnsVersionId={props.setCurrentAnsVersionId}
          />
          {props.loading ? (
            <BeatLoader css={override} color={'#3694D7'} loading={props.loading} />
          ) : (
            <QuestionContainer
              isMaximizeContent={isMaximizeContent}
              candidateTrackId={candidateTrackId}
              capability={capability}
              handleMaximizeContent={handleMaximizeContent}
              setCapability={props.setCapability}
              selectedCapabilityId={props.selectedCapabilityId}
              setAnswer={props.setAnswer}
              saveResponseForQuestionOfCandidateTrack={props.saveResponseForQuestionOfCandidateTrack}
              Modal={Modal}
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
              goToPaymentPage={goToPaymentPage}
              triggerFeedback={triggerFeedback}
              setTriggerFeedback={setTriggerFeedback}
            />
          )}
          {(!expertLogin) && showOnboardingModal && <OnboardingModal onMarkDone={markAsDone} goToVideo={goToOnboardingVideo}></OnboardingModal>}
        </div>
      </div>
    </StyledQuestionPage>
  );
};

const mapStateToProps = (state: any) => ({
  loading: state.evaluationPlatform.loading,
  currentTrack: state.evaluationPlatform.currentTrack,
  candidateTrackId: state.evaluationPlatform.currentTrack?.candidateTrack?.[0].candidateTrackId,
  selectedCapabilityId: state.evaluationPlatform.selectedCapabilityId,
  currentQuestionId: state.evaluationPlatform.currentQuestionId,
  candidate: state.evaluationPlatform.candidate,
  paymentTrack: state.payment,
});

const mapDispatchToProps = {
  setAnswer,
  setCapability,
  setQuestionId,
  saveResponseForQuestionOfCandidateTrack,
  submitResponseToExpert,
  setFeedback,
  handleEdit,
  setAllFeedbacks,
  setQuestionFeedbackViewed,
  candidateViewedExpertFeedback,
  getDetailsForCandidatebyCandidateTrackId,
  getAnswerStatus,
  setCurrentAnsVersionId,
  saveCandidateLastActivity,
  setScrollPosition,
};

interface ITriggerFeedback {
  questionId: string;
  expertId: string;
  answerId: string;
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
