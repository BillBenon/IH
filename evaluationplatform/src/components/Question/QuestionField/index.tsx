import { Check } from '@styled-icons/entypo/Check';
import { Loop2 } from '@styled-icons/icomoon/Loop2';
import { ExpandLess, ExpandMore } from '@styled-icons/material-outlined';
import { FeedbackReceivedIcon_Anim, FeedbackUnderReviewIcon_Anim } from 'assets';
import { AllAnswersSet, AnswerSet, RoundButton } from 'components';
import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { RootState } from 'store';
import { getNotificationMsg } from 'store/evaluationPlatform';
import styled from 'styled-components';
import { QUESTION_STATUS_COLORS } from 'theme/colors';
import QuestionStatusIcon from 'theme/icons/question/circleQuestionStatusIcon';
import {
  ISaveResponseForQuestionOfCandidateTracks as IPayload
} from 'types';
import { DEFAULT_TOKEN, Expert_Login, MENUS, PlanType, QUESTION_STATUS_TEXT } from 'utilities/constants';
import { getAnsStatusText, handleMarkedText } from 'utilities/helperFunctions';
import AnswerHelpLinks from './AnswerHelpLinks';
import { ShareQuestion } from './AnswerSet/AnswerField/ShareQuestion';

const Styledfeedback = styled.img`
  width: 25px;
  height: auto;
`

const StyledQuestion = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${props => props.communityVersion ? "0px" : "43px"};
  padding-bottom: 30px;
  @keyframes feedback {
    0% {
      color: black;
    }
    50% {
      color: #5b94e3;
    }
    100% {
      color: black;
    }
  }
  @keyframes loop {
    0% {
      transform: rotate(0deg);
    }
    10% {
      transform: rotate(36deg);
    }
    20% {
      transform: rotate(72deg);
    }
    30% {
      transform: rotate(108deg);
    }
    40% {
      transform: rotate(144deg);
    }
    50% {
      transform: rotate(180deg);
    }
    60% {
      transform: rotate(216deg);
    }
    70% {
      transform: rotate(252deg);
    }
    80% {
      transform: rotate(288deg);
    }
    90% {
      transform: rotate(324deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .question__header {
    margin-left: 15px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    svg {
      position: relative;
      top: 9px;
    }
    img {
        cursor: pointer
        margin-top: 5px;
    }
    .loop-icon {
      position: absolute;
    }

    .circle-icon {
      svg {
        width: 8px;
        left: 3px;
      }
    }
  }
  .question__title {
    text-align: start;
    margin-left: 21px;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    color: #000000;
  }
  .question__description {
    margin-left: 52px;
    margin-top: 15px;
    text-align: left;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    color: #000000;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
  }
  .question__description__text {
    .ql-disabled{
      background: white !important;
    }
    .ql-editor{
      padding-left: 0;
      min-height: auto !important;
    }
    margin-right: 26px;
  }
  .question__options {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .hint-solution-link {
    display: flex;
    flex-direction: row;
  }
  .solution__link {
    margin-right: 10px;
  }
  .hint__link {
    margin-right: 40px;
  }
  .question__answers {
    margin-left: 54px;
    margin-top: 35px;
  }
  .answer-version-buttons {
    margin-left: 54px;
  }
  .answer-version-buttons button {
    margin-right: 5px;
  }
  .try-again-button {
    margin-left: 54px;
  }
`;

const StyledLoopIcon = styled(Loop2)`
  position: absolute;
  width: 15px;
  height: auto;
  color: ${(props: any) => props.fill};
  animation-name: loop;
  animation-duration: 1s;
`;

const StyledCheckIcon = styled(Check)`
  stroke-width: 5%;
  width: 27px;
  height: auto;
  color: green;
`;

const StyledAnimatedIcon = styled((
  { component, ...props }) => React.cloneElement(component, props))`
  width: 40px;
  height: auto;
  cursor: pointer;
  ${({ animate }: { animate: boolean }) => {
    return animate ? {
      animationName: 'feedback',
      animationDuration: '1s',
      animationIterationCount: 'infinite'
    } : {}
  }}
`
interface IProps {
  idx?: number;
  candidateTrackId: string;
  capabilityId: string;
  handleMaximizeContent: Function;
  isMaximizeContent: boolean;
  setAnswer: Function;
  saveResponseForQuestionOfCandidateTrack: Function;
  Modal?: any;
  setQuestionId: Function;
  currentQuestionId: string;
  submitResponseToExpert: Function;
  setFeedback: Function;
  handleEdit: Function;
  setQuestionFeedbackViewed: Function;
  candidateViewedExpertFeedback?: Function;
  questionSet: {
    question: any;
    answers: any;
  };
  isMeetingView?: boolean;
  candidate: any;
  setCurrentAnsVersionId: Function,
  saveCandidateLastActivity: Function,
  goToPaymentPage: Function,
  triggerFeedback: any;
  setTriggerFeedback: any;
  communityVersion?: boolean;
  handleAnswerShare?: () => void;
  expertName?: string;
  setMinimizeRecording?: Function;
  minimizedModelIndex?: string;
  currModelIndex?: string;
  openRecorder: string;
  setOpenRecorder: any;
}

const selectIcon = (status: string) => {
  switch (status) {
    case QUESTION_STATUS_TEXT.UNANSWERED:
      return <QuestionStatusIcon fill={QUESTION_STATUS_COLORS.UNANSWERED} />;
    case QUESTION_STATUS_TEXT.ANSWERED:
      return <QuestionStatusIcon fill={QUESTION_STATUS_COLORS.ANSWERED} />;
    case QUESTION_STATUS_TEXT.SUBMITTED_FOR_REVIEW:
      return <QuestionStatusIcon fill={QUESTION_STATUS_COLORS.SUBMITTED_FOR_REVIEW} />;
    case QUESTION_STATUS_TEXT.UNDER_REVIEW:
      return <Styledfeedback src={FeedbackUnderReviewIcon_Anim} />;
    case QUESTION_STATUS_TEXT.FEEDBACK_RECEIVED:
      return <Styledfeedback src={FeedbackReceivedIcon_Anim} />;
    case QUESTION_STATUS_TEXT.FEEDBACK_VIEWED:
      return <QuestionStatusIcon fill={QUESTION_STATUS_COLORS.FEEDBACK_VIEWED} />;
    case QUESTION_STATUS_TEXT.LOOP_UNANSWERED:
      return (
        <div className="loop">
          <div className="loop-icon">
            <StyledLoopIcon fill={QUESTION_STATUS_COLORS.UNANSWERED} />
          </div>
          <div className="circle-icon">
            <QuestionStatusIcon fill={QUESTION_STATUS_COLORS.UNANSWERED} />
          </div>
        </div>
      );
    case QUESTION_STATUS_TEXT.LOOP_ANSWERED:
      return (
        <div className="loop">
          <div className="loop-icon">
            <StyledLoopIcon fill={QUESTION_STATUS_COLORS.ANSWERED} />
          </div>
          <div className="circle-icon">
            <QuestionStatusIcon fill={QUESTION_STATUS_COLORS.ANSWERED} />
          </div>
        </div>
      );
    case QUESTION_STATUS_TEXT.LOOP_SUBMITTED_FOR_REVIEW:
      return (
        <div className="loop">
          <div className="loop-icon">
            <StyledLoopIcon fill={QUESTION_STATUS_COLORS.SUBMITTED_FOR_REVIEW} />
          </div>
          <div className="circle-icon">
            <QuestionStatusIcon fill={QUESTION_STATUS_COLORS.SUBMITTED_FOR_REVIEW} />
          </div>
        </div>
      );
    case QUESTION_STATUS_TEXT.LOOP_UNDER_REVIEW:
      return <Styledfeedback src={FeedbackUnderReviewIcon_Anim} />;
    case QUESTION_STATUS_TEXT.LOOP_FEEDBACK_RECEIVED:
      return <Styledfeedback src={FeedbackReceivedIcon_Anim} />;
    case QUESTION_STATUS_TEXT.LOOP_FEEDBACK_VIEWED:
      return (
        <div className="loop">
          <div className="loop-icon">
            <StyledLoopIcon fill={QUESTION_STATUS_COLORS.FEEDBACK_VIEWED} />
          </div>
          <div className="circle-icon">
            <QuestionStatusIcon fill={QUESTION_STATUS_COLORS.FEEDBACK_VIEWED} />
          </div>
        </div>
      );
  }
};

const QuestionHeader = (props: any) => {
  const status = props.question.underFeedbackLoop ? `LOOP_${props.question.status}` : props.question.status;
  const animate = status === QUESTION_STATUS_TEXT.LOOP_FEEDBACK_RECEIVED || status === QUESTION_STATUS_TEXT.FEEDBACK_RECEIVED;
  return (
    <div className="question__header">
      <ReactTooltip id="qStatus2" type="dark" />
      {<span
        data-tip={"Response, Review completed."}
        data-for="qStatus2">
        {props.question.answerCompleted && <StyledCheckIcon />}
      </span>}
      <span
        data-tip={getAnsStatusText(props.question.status)}
        data-for="qStatus">
        {selectIcon(status)}
      </span>
      <ReactTooltip id="qStatus" type="dark" />
      <div className="question__title" style={{ width: '100%' }}>
        {props.idx !== undefined && `Q${props.idx + 1}: `}{props.question.title}
      </div>
      {
        !props.communityVersion && (props.expandDescription ?
          <StyledAnimatedIcon
            component={<ExpandLess />}
            onClick={props.handleExpandClick}
            animate={animate ? true : false} /> :
          <StyledAnimatedIcon
            component={<ExpandMore />}
            onClick={props.handleExpandClick}
            animate={animate ? true : false} />)
      }
    </div>
  );
};

const QuestionDescription = (props: any) => (
  <div className="question__description">
    <div className="question__description__text">
      <RichTextEditor
        doNotAllowCopy={true}
        disabled={true}
        id={props.question._id}
        value={handleMarkedText(props.question.description)}
        customStyles={{ height: 'auto', resize: 'none', boxShadow: 'none' }}
      />
    </div>
  </div>
);

const QuestionOptions = (props: any) => {
  let totalAnswers = props.answers?.length;

  const AnswerVersionButtons = () => {
    return (
      <div className="answer-version-buttons">
        {totalAnswers > 1 ? (
          <>
            {props.answers.map((item: any, idx: number) => {
              return (
                <React.Fragment key={`answerversionbutton-${idx}`}>
                  <button
                    style={props.answerVersion === idx ? { background: '#6d6d6d', color: 'white' } : {}}
                    onClick={() => {
                      props.setAnswerVersion(idx);
                      props.setIsShowAllVersions(false);
                      props.setCurrentAnsVersionId({
                        questionId: props.question._id,
                        ansVersionId: props.answers[idx]?.answer._id
                      });
                      !props.communityVersion && props.saveCandidateLastActivity({
                        selectedCapabilityId: props.capabilityId,
                        currentQuestionId: props.question._id,
                        currentAnsVersionId: props.answers[idx]?.answer._id
                      })
                    }}
                    data-tip={(idx === 0 && !props.communityVersion) ? 'Your current response' : `Version${totalAnswers - idx}`}
                    data-for="answer-version-icon"
                  >
                    {(idx === 0 && !props.communityVersion) ? 'CURRENT' : `V${totalAnswers - idx}`}
                  </button>
                  <ReactTooltip id="answer-version-icon" type="dark" />
                </React.Fragment>
              );
            })}
            <button
              style={props.isShowAllVersions ? { background: '#6d6d6d', color: 'white' } : {}}
              onClick={() => {
                props.setIsShowAllVersions(true);
                props.setAnswerVersion(-1);
              }}
              data-tip="All Versions"
              data-for="answer-version-icon"
            >
              All
            </button>
          </>
        ) : null}
      </div>
    );
  };

  const QuestionLinks = () => (
    <div className="question__options">
      <AnswerVersionButtons />
      {!props.communityVersion && <AnswerHelpLinks
        capabilityId={props.capabilityId}
        question={props.question}
        setCurrentAnsVersionId={props.setCurrentAnsVersionId}
        goToPaymentPage={props.goToPaymentPage}></AnswerHelpLinks>}
    </div>
  );

  return (
    <div>
      <QuestionLinks />
    </div>
  );
};

export const QuestionAnswers = (props: any) => {
  const { question, answers } = props;
  const { isSaved, questionStatusText, setIsSaved, setQuestionStatusText } = props;

  useEffect(() => {
    props.setOpenRecorder('-1')
    props.setMinimizeRecording('-1')
  }, [])

  return (
    <div className="question__answers">
      {props.isShowAllVersions ? (
        <AllAnswersSet communityVersion={props.communityVersion} answers={answers} capabilityId={props.capabilityId} candidate={props.candidate}></AllAnswersSet>
      ) : (
        <AnswerSet
          isMeetingView={props.isMeetingView}
          questionInfo={props.questionSet}
          communityVersion={props.communityVersion}
          idx={answers.length > 0 ? props.answerVersion : -1}
          candidateTrackId={props.candidateTrackId}
          capabilityId={props.capabilityId}
          questionId={question._id}
          answer={answers.length > 0 ? answers[props.answerVersion] : null}
          handleMaximizeContent={props.handleMaximizeContent}
          isMaximizeContent={props.isMaximizeContent}
          setAnswer={props.setAnswer}
          saveResponseForQuestionOfCandidateTrack={props.saveResponseForQuestionOfCandidateTrack}
          isSaved={isSaved}
          setIsSaved={setIsSaved}
          questionStatusText={questionStatusText}
          setQuestionStatusText={setQuestionStatusText}
          submitResponseToExpert={props.submitResponseToExpert}
          question={question}
          setFeedback={props.setFeedback}
          handleEdit={props.handleEdit}
          answerVersion={props.answerVersion}
          totalAnswerVersions={props.answers?.length}
          setQuestionId={props.setQuestionId}
          triggerFeedback={props.triggerFeedback}
          setTriggerFeedback={props.setTriggerFeedback}
          handleAnswerShare={props.handleAnswerShare}
          expertName={props.expertName}
          setMinimizeRecording={props.setMinimizeRecording}
          minimizedModelIndex={props.minimizedModelIndex}
          currModelIndex={props.currModelIndex}
          openRecorder={props.openRecorder}
          setOpenRecorder={props.setOpenRecorder}
        />
      )}
    </div>
  );
};

const TryAgainButton = (props: any) => (
  <div className="try-again-button">
    <RoundButton onClick={props.handleTryAgain}>Try again</RoundButton>
  </div>
);

const getQuestionStatus = (question: any) => {
  if (question.underFeedbackLoop === false) {
    return question.status;
  } else {
    return `LOOP_${question.status}`;
  }
};

export const QuestionField: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [expandDescription, setExpandDescription] = useState(true);
  const scollRef = useRef<any>()
  const [question, setQuestion] = useState(props.questionSet?.question);
  const [answers, setAnswers] = useState(props.questionSet?.answers);
  const lastSelectedAnswerId = useSelector((state: any) => state.evaluationPlatform.currentAnsVersionId)
  const lastSelectedQuestionId = useSelector((state: any) => state.evaluationPlatform.currentQuestionId)
  const selectedIndex = answers.findIndex((x: any) => x.answer._id === lastSelectedAnswerId)
  const [answerVersion, setAnswerVersion] = useState((selectedIndex && selectedIndex !== -1) ? selectedIndex : 0);
  const [isSaved, setIsSaved] = useState(false);
  const [questionStatusText, setQuestionStatusText] = useState('');
  const candidateId = useSelector((state: any) => state.evaluationPlatform?.candidate?._id);
  const questionStatus = getQuestionStatus(question);
  const [isShowAllVersions, setIsShowAllVersions] = useState(false);
  const expertLogin = (getValueBrowserStorage(Expert_Login) == null) ? false : true;
  const { trackPlan, trackId } = useSelector((state: RootState) => state.payment);
  const handleExpandClick = () => {
    setExpandDescription(!expandDescription);
    if (
      questionStatus === QUESTION_STATUS_TEXT.FEEDBACK_RECEIVED ||
      questionStatus === QUESTION_STATUS_TEXT.LOOP_FEEDBACK_RECEIVED
    ) {
      const questionAnswerId = answers[0].answer._id;
      const feedbackId = answers[0].feedbacks[0]._id;
      if (props.candidateViewedExpertFeedback) {
        props
          .candidateViewedExpertFeedback({
            token: DEFAULT_TOKEN,
            candidateTrackId: props.candidateTrackId,
            questionId: question._id,
            candidateId,
            questionAnswerId,
            feedbackId,
          }).then((res: any) => {
            if (res.payload) {
              props.setQuestionFeedbackViewed({
                capabilities: question.capabilities,
                questionId: question._id,
                questionAnswerId: questionAnswerId,
              });
              dispatch(getNotificationMsg({ trackId, "menu": MENUS.TRACK })); // Update TRACK notifications
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    }
  };
  const handleTryAgain = () => {
    let capabilityIds: string[] = [...answers[0].answer.capabilityIds];
    capabilityIds.push(props.capabilityId);
    capabilityIds = _.uniq(capabilityIds);

    const payload: IPayload = {
      token: DEFAULT_TOKEN,
      candidateTrackId: props.candidateTrackId,
      capabilityIds,
      questionId: question._id,
      answer: '',
      codeAnswer: '',
      codeType: ''
    };
    props
      .saveResponseForQuestionOfCandidateTrack(payload)
      .then((res: any) => {
        if (res.payload) {
          const answer = res.payload.output;
          const data = {
            _id: answer.questionAnswerId,
            questionId: answer.questionId,
            answer: answer.answer,
            codeAnswer: '',
            codeType: '',
            candidateTrackId: answer.candidateTrackId,
            updateAt: new Date(answer.updateAt).toUTCString(),
            sketchAvailable: answer.sketchAvailable
          };
          props.setCurrentAnsVersionId({
            questionId: answer.questionId,
            ansVersionId: answer.questionAnswerId
          })
          props.setAnswer({
            capabilities: question.capabilities,
            questionId: question._id,
            answer: data,
            isUpdate: false,
          });
        } else {
        }
      })
      .catch((err: any) => {
        console.log('creating new response error', err);
      });
  };
  useEffect(() => {
    setQuestion(props.questionSet?.question);
    setAnswers(props.questionSet?.answers);
    setAnswerVersion((selectedIndex && selectedIndex !== -1) ? selectedIndex : 0);
    setIsShowAllVersions(false);
    if (question.status === QUESTION_STATUS_TEXT.FEEDBACK_RECEIVED) {
      setExpandDescription(false);
    } else {
      setExpandDescription(true);
    }
    // eslint-disable-next-line
    // eslint-disable-next-line
  }, [props.capabilityId, props.questionSet]);

  useEffect(() => {
    if (question._id === lastSelectedQuestionId) {
      setTimeout(() => {
        scollRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 0);
    }
  }, [lastSelectedQuestionId])// eslint-disable-line

  return (
    <StyledQuestion communityVersion={props.communityVersion} ref={(re: any) => (scollRef.current = re)}>
      <>
        <QuestionHeader
          communityVersion={props.communityVersion}
          idx={props.idx}
          question={question}
          expandDescription={expandDescription}
          handleExpandClick={handleExpandClick}
        />
        {!props.communityVersion && <QuestionDescription
          expandDescription={expandDescription}
          question={question}
        />}
      </>
      {expandDescription ? (
        <QuestionOptions
          communityVersion={props.communityVersion}
          capabilityId={props.capabilityId}
          Modal={props.Modal}
          question={question}
          setQuestionId={props.setQuestionId}
          currentQuestionId={props.currentQuestionId}
          setAnswerVersion={setAnswerVersion}
          answers={answers}
          answerVersion={answerVersion}
          isShowAllVersions={isShowAllVersions}
          setIsShowAllVersions={setIsShowAllVersions}
          setCurrentAnsVersionId={props.setCurrentAnsVersionId}
          saveCandidateLastActivity={props.saveCandidateLastActivity}
          goToPaymentPage={props.goToPaymentPage}
        />
      ) : null}
      {expandDescription ? (
        <QuestionAnswers
          isMeetingView={props.isMeetingView}
          communityVersion={props.communityVersion}
          question={question}
          answers={answers}
          handleMaximizeContent={props.handleMaximizeContent}
          isMaximizeContent={props.isMaximizeContent}
          candidateTrackId={props.candidateTrackId}
          capabilityId={props.capabilityId}
          setAnswer={props.setAnswer}
          saveResponseForQuestionOfCandidateTrack={props.saveResponseForQuestionOfCandidateTrack}
          submitResponseToExpert={props.submitResponseToExpert}
          setFeedback={props.setFeedback}
          handleEdit={props.handleEdit}
          answerVersion={answerVersion}
          isSaved={isSaved}
          questionStatusText={questionStatusText}
          setIsSaved={setIsSaved}
          setQuestionId={props.setQuestionId}
          setQuestionStatusText={setQuestionStatusText}
          isShowAllVersions={isShowAllVersions}
          candidate={props.candidate}
          triggerFeedback={props.triggerFeedback}
          setTriggerFeedback={props.setTriggerFeedback}
          handleAnswerShare={props.handleAnswerShare}
          expertName={props.expertName}
          setMinimizeRecording={props.setMinimizeRecording}
          minimizedModelIndex={props.minimizedModelIndex}
          currModelIndex={props.currModelIndex}
          openRecorder={props.openRecorder}
          setOpenRecorder={props.setOpenRecorder}
        />
      ) : null}
      {!!answers?.length && !props.isMeetingView && <ShareQuestion answers={answers} questionId={question._id} onShare={props.handleAnswerShare} />}
      {!props.isMeetingView && ((!expertLogin) && trackPlan.toLowerCase() !== PlanType.Evaluation.toLowerCase()
        && (questionStatus === QUESTION_STATUS_TEXT.FEEDBACK_VIEWED ||
          questionStatus === QUESTION_STATUS_TEXT.LOOP_FEEDBACK_VIEWED))
        && (
          <TryAgainButton handleTryAgain={handleTryAgain} />
        )}
    </StyledQuestion>
  );
};
