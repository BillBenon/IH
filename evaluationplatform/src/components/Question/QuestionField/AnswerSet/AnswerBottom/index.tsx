import { RoundButton } from 'components';
import { useQuestions } from 'components/Question/useQuestions';
import { useLoader } from 'context/loaderDots';
import { useMessagePopup } from 'context/messagePopup';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { evaluationPlatformService } from 'services';
import styled from 'styled-components';
import { IVerifyEditing } from 'types';
import { API_TIMEOUT, DEFAULT_TOKEN, QUESTION_STATUS_TEXT, TrackEnrollType, Expert_Login } from 'utilities/constants';
import { getDateTimeInLocalFormat, getEnrollmentType, getExpertName, notEmpty } from 'utilities/helperFunctions';
import { ExpertSelectionModal } from './ExpertSelectionModal';
import { getValueBrowserStorage } from 'services/browserStorageService';

const StyledAnswerBottom = styled.div`
  display: flex;
  flex-direction: column;
  .answer-buttonarea {
    display: flex;
    flex-direction: row;
    justify-content: center;
    button:focus{
      outline: none;
      border: black 2px solid;
    }
    margin-top: 32px;
    .save-button-inside {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .save-button-inside span {
      margin-right: 5px;
    }
  }
  .answer-statusarea {
    margin-top: 30px;
    font-family: Khula;
    font-style: normal;
    font-size: 16px;
    text-align: center;
    color: #5f5f5f;
  }
`;

interface IProps {
  id: string;
  candidateTrackId: string;
  capabilityId: string;
  questionId: string;
  answer: any;
  questionStatusText: string;
  setQuestionStatusText: any;
  submitResponseToExpert: any;
  question: any;
  setFeedback: any;
  handleEdit: any;
  answerStatus: string;
  triggerFeedback: any;
  setTriggerFeedback: any;
}

interface IAnsStatusTxtProps {
  questionStatusText: string;
}


const StatusText = (props: IAnsStatusTxtProps) => {
  return (
    <div className="answer-statusarea" data-testid="answerfield-statustext">
      {
        `${props.questionStatusText}`
      }&nbsp;
    </div>
  );
};

const QuestionButtons = (props: IProps) => {
  const loader = useLoader();
  const { enqueueSnackbar } = useSnackbar();
  const { getExperts, getAnswersList } = useQuestions();
  const [isShowChooseExpert, setShowChooseExpert] = useState(false);
  const messagePopup = useMessagePopup();

  const expertLogin = (getValueBrowserStorage(Expert_Login)== null)?false:true;

  useEffect(() => {
    if (notEmpty(props.triggerFeedback)
      && props.triggerFeedback.questionId === props.questionId
      && props.triggerFeedback.answerId === props.answer.answer._id) {
      submitFeedbackToExpert(props.triggerFeedback.expertId);
    }
  }, [props.triggerFeedback]);

  const submitFeedbackToExpert = (expertId: string) => {
    loader.showLoader();
    const capabilityIds: string[] =
      props.answer?.answer && props.answer.answer?.capabilityIds ? [...props.answer.answer.capabilityIds] : [];
    if (capabilityIds.indexOf(props.capabilityId) < 0) capabilityIds.push(props.capabilityId);
    const payload = {
      token: DEFAULT_TOKEN,
      candidateTrackId: props.candidateTrackId,
      capabilityIds,
      questionId: props.questionId,
      questionAnswerId: props.answer?.answer._id,
      expertId: expertId
    };
    props
      .submitResponseToExpert(payload)
      .then((res: any) => {
        if (res.payload) {
          props.setFeedback({
            ...res.payload.output,
            expertId,
            capabilities: props.question?.capabilities,
          });
          props.setQuestionStatusText('Submitted for Review');
          messagePopup.success('Your response is submitted');
          // enqueueSnackbar("Answer submitted to expert", {
          //   variant: 'success',
          //   autoHideDuration: 2500,
          // });
        } else {
          // enqueueSnackbar(res.error?.message, {
          //   variant: 'error',
          //   autoHideDuration: 2500,
          // });
          messagePopup.fail('Submission failed. Please try again.');
        }
        loader.hideLoader();
      })
      .catch((err: any) => {
        // enqueueSnackbar(err?.message, {
        //   variant: 'error',
        //   autoHideDuration: 2500,
        // });
        if (err.message === API_TIMEOUT.message) {
          messagePopup.fail('Request timeout! Submission aborted.');
        }
        else messagePopup.fail('Submission failed. Please try again.');
        loader.hideLoader();
      }
      );
  }

  const handleSelectExpert = () => {
    if (getEnrollmentType() === TrackEnrollType.FORPLACEMENT) {
      let answers = getAnswersList(props.questionId,props.capabilityId)?.answers
      if(answers.length>1){
        let lstFeedbackExpertId = answers[1].feedbacks[0].expertId
        setTimeout(() => submitFeedbackToExpert(lstFeedbackExpertId), 1000)
      }
      else{
        let expertList = getExperts()
        if(expertList?.length > 0){
          let randomisedExpert = expertList[Math.floor(Math.random() * expertList.length)]
          setTimeout(() => submitFeedbackToExpert(randomisedExpert?._id), 1000)
        } 
        else{
          enqueueSnackbar('Expert id not found.', {
           variant: 'error',
           autoHideDuration: 2500,
         })
      }
      }
    }
    else
      setShowChooseExpert(true)
  }

  return (
    <div>
      <ExpertSelectionModal
        isShowChooseExpert={isShowChooseExpert}
        setShowChooseExpert={setShowChooseExpert}
        questionId={props.questionId}
        answerId={props.answer?.answer?._id}
        submitFeedbackToExpert={submitFeedbackToExpert} />
      <div className="answer-buttonarea">
        {
          (!expertLogin)?(<RoundButton onClick={handleSelectExpert}>Submit for feedback</RoundButton>):''
        }
      </div>
    </div>
  );
};

const EditButton = (props: any) => {
  const loader = useLoader();
  const messagePopup = useMessagePopup();
  const handleEditing = () => {
    props.setTriggerFeedback({})
    loader.showLoader();
    const capabilityIds: string[] =
      props.answer?.answer && props.answer.answer?.capabilityIds ? [...props.answer.answer.capabilityIds] : [];
    if (capabilityIds.indexOf(props.capabilityId) < 0) capabilityIds.push(props.capabilityId);
    const payload: IVerifyEditing = {
      token: DEFAULT_TOKEN,
      candidateTrackId: props.candidateTrackId,
      capabilityId: props.capabilityId,
      questionId: props.questionId,
      questionAnswerId: props.answer?.answer._id
    };
    evaluationPlatformService.verifyEditing(payload).then((res: any) => {
      if (res.output.enableAnswer) {
        props.handleEdit({ ...payload, capabilityIds, capabilities: props.question?.capabilities, enableAnswer: res.output.enableAnswer })
      }
      else {
        props.handleEdit({ 
          ...payload, 
          capabilityIds, 
          capabilities: props.question?.capabilities, 
          expertId: res.output.expertId,
          enableAnswer: res.output.enableAnswer
        })
        messagePopup.fail(res.apiMessage)
      }
    }).catch(err => messagePopup.fail('Something went wrong please try again.'))
      .finally(() => loader.hideLoader())
  }

  return(<>
    <div className="answer-buttonarea">
        <RoundButton onClick={handleEditing}>Edit</RoundButton>
      </div>
  </>)
}

export const AnswerBottom: React.FC<IProps> = (props) => {
  const expertName = getExpertName(props.answer?.feedbacks[0]?.expertId)
  const ansDate = getDateTimeInLocalFormat(props?.answer?.answer?.updateAt);
  const expertLogin = (getValueBrowserStorage(Expert_Login)== null)?false:true;
  const feedbackDate = getDateTimeInLocalFormat(props?.answer?.feedbacks[0]?.feedbackAt);
  useEffect(() => {
    if (props.answerStatus === QUESTION_STATUS_TEXT.SUBMITTED_FOR_REVIEW) {
      props.setQuestionStatusText(`Submitted for Review ${expertName ? `to ${expertName} ` : ''} on ${ansDate}`);
    } else if (props.answerStatus === QUESTION_STATUS_TEXT.UNDER_REVIEW) {
      props.setQuestionStatusText(`Your response is under review by ${expertName}`);
    } else if (props.answerStatus === QUESTION_STATUS_TEXT.FEEDBACK_VIEWED) {
      props.setQuestionStatusText(`You responded on ${ansDate}, feedback received on ${feedbackDate}, provided by ${expertName}`);
    } else if (props.answerStatus === QUESTION_STATUS_TEXT.ANSWERED) {
      props.setQuestionStatusText(`Saved successfully at ${ansDate}`);
    } if (props.answerStatus === QUESTION_STATUS_TEXT.UNANSWERED) {
      props.setQuestionStatusText('');
    }
    // else if (props.answerStatus === QUESTION_STATUS_TEXT.ANSWERED) {
    // else if (props.answerStatus === QUESTION_STATUS_TEXT.ANSWERED) {
    //   props.setQuestionStatusText('Your answer is under review');
    // }
    // eslint-disable-next-line
  }, [props.answerStatus, props.answer]);

  return (
    <StyledAnswerBottom>
      <StatusText questionStatusText={props.questionStatusText} />
      {props.answerStatus === 'UNANSWERED' || (props.answerStatus === 'ANSWERED' && <QuestionButtons {...props} />)}
      {props.answerStatus === 'SEND_FOR_REVIEW' && (!expertLogin) &&  <EditButton {...props}/>}
    </StyledAnswerBottom>
  );
};
