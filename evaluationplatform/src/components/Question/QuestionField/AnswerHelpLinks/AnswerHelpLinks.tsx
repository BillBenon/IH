import { Close } from '@styled-icons/evaicons-solid/Close';
import { StyledLinkText } from 'components';
import { Button } from 'components/Common/Button';
import { ModalComponent } from 'components/Common/Modal/Modal';
import Evaluations from 'components/Modals/Evaluations';
import { useMessagePopup } from 'context/messagePopup';
import React, { useCallback, useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { HintsAndSampleSolutionService } from 'services/hintsAndSampleSolutions';
import { RootState } from 'store';
import styled from 'styled-components';
import { getEnrollmentType } from 'utilities';
import { DEFAULT_TOKEN, Expert_Login, TrackEnrollType } from 'utilities/constants';
import { evalPlanUpgradeMessage } from '../../../../utilities/constants';
import Hints from '../../../Modals/Hints';
import SampleSolutions from '../../../Modals/SampleSolutions';
import { SharedAnswerComponent } from './SharedAnswerComponent';
import "./answerStyles.css";

const StyledSolutionsLink = styled.span`
  padding-left: 1rem;
`;

const modalStyle: Modal.Styles | undefined = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.44)',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    position: 'fixed',
  },
  content: {
    position: 'absolute',
    background: 'white',
    borderRadius: '10px',
    padding: '1rem',
    margin: 'auto',
    width: '60%',
    height: 'fit-content',
    overflow: 'none',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
  },
}

const ErrorContent = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 1.5rem 1rem 1rem;
    .head {
      font-weight: 800;
      margin-bottom: 2rem;
    };
    .desc {
      font-weight: 600;
      margin-bottom: 2rem;
    };
    .action .moreBtn{
      border-radius: 10px;
      border: none;
      padding: 5px 10px;
      font-size: 1rem;
      font-weight: 600;
      height: auto;
      font-family: inherit;
    };
  }
  }
`;

const CloseButton = styled(Close)`
  width: 20px;
  float: right;
  cursor: pointer;
`;

interface IProps {
  question: any;
  goToPaymentPage: any;
  capabilityId: any;
  setCurrentAnsVersionId: Function;
}
const AnswerHelpLinks = (props: IProps) => {
  const MsgPopUp = useMessagePopup();
  const [capEvaluations, setCapEvaluations] = useState([]);
  const [isEvaluationsOpen, setIsSetEvaluationsOpen] = useState(false);
  const [isHintsOpen, setIsHintsOpen] = useState(false);
  const [questionHints, setquestionHints] = useState([]);
  const [sampleSolutions, setsampleSolutions] = useState([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSampleSolutionsOpen, setIsSampleSolutionsOpen] = useState(false);
  const expertLogin = (getValueBrowserStorage(Expert_Login)== null)?false:true;
  const { sharedQuestionIds } = useSelector((state: RootState) => state.evaluationPlatform);
  const [showSharedAnswerModal, setShowSharedAnswerModal] = useState<boolean>(false);
  const showSampleSolutions = () => {
    // loader.showLoader();
    if(!expertLogin){
      const payload = getPayload();
      if (payload) HintsAndSampleSolutionService.getSampleSolutionsByQuestion(payload).then(res => {
        if (res.apiMessage === evalPlanUpgradeMessage) {
          setIsErrorModalOpen(true);
        }
        else if (!res.output) {
          MsgPopUp.fail('Something went wrong..!!')
        }
        else {
          setsampleSolutions(res.output);
          setIsSampleSolutionsOpen(true);
        }
        // loader.hideLoader();
      });
      // else loader.hideLoader();
    }
  };

  function toggleSolutionsModal(e: any) {
    setIsSampleSolutionsOpen(!isSampleSolutionsOpen);
  }

  function toggleHintModal(e: any) {
    setIsHintsOpen(!isHintsOpen);
  }
  function toggleEvalModal(e: any) {
    setIsSetEvaluationsOpen(!isEvaluationsOpen);
  }

  const showSharedAnswers = () => {
    setShowSharedAnswerModal(true);
  }

  const showHints = () => {
    if(!expertLogin){
      // loader.showLoader(true);
      const payload = getPayload();
      if (payload) HintsAndSampleSolutionService.getHintsByQuestion(payload).then(res => {
        if (res.apiMessage === evalPlanUpgradeMessage) {
          setIsErrorModalOpen(true);
        }
        else if (!res.output) {
          MsgPopUp.fail('Something went wrong..!!')
        }
        else {
          setquestionHints(res.output);
          setIsHintsOpen(true);
        }
        // loader.hideLoader();
      });
      // else loader.hideLoader();
    }
  };

  const showEvaluaions = () => {
    const payload = getPayload();
    if (payload) HintsAndSampleSolutionService.getEvaluations(payload).then(res => {
      if (!res.output) {
        MsgPopUp.fail('Something went wrong..!!')
      }
      else {
        setCapEvaluations(res.output?.capabilities.filter((cEval: any) => cEval.evaluations.length > 0) || []);
        setIsSetEvaluationsOpen(true);
      }
    });
  };

  const getPayload = () => {
    const trackId = getValueBrowserStorage('candidateTrackId');
    const questionId = props.question._id as string;
    if (trackId && questionId) {
      return {
        token: DEFAULT_TOKEN,
        candidateTrackId: trackId,
        questionId: questionId
      }
    }
    else return null;
  }

  const showSharedAnswersLink = () => {
    const sharedQuestion = sharedQuestionIds.find(q => q.questionId ===  props.question._id);
    return sharedQuestion && sharedQuestion.communityShared
  }

  const isSharedAnswersAvailable = showSharedAnswersLink();

  return (
    <>
      <div>
        <ReactTooltip id="sharedAnswer" type="dark" />
        {isSharedAnswersAvailable && (
          <StyledLinkText className="mr-2" size={20} data-tip="See answers shared in community" weight="normal" data-for="sharedAnswer">
            <span onClick={showSharedAnswers}>{'Shared Answers'}</span>
          </StyledLinkText>
        )}
        {(props.question?.hintsAvailable && questionHints.length >= 0) && (
          <StyledLinkText size={20} weight="normal" data-tip="Best Practices" data-for="hintLink">
            <span onClick={showHints}>Hints</span>
          </StyledLinkText>
        )}
        <ReactTooltip id="hintLink" type="dark" />
        {(props.question?.sampleSolutionsAvailable && sampleSolutions.length >= 0) && (
          <StyledLinkText size={20} weight="normal" data-tip="Sample Solutions" data-for="solutionLink">
            <StyledSolutionsLink onClick={showSampleSolutions}>Sample Solutions</StyledSolutionsLink>
          </StyledLinkText>
        )}
        <ReactTooltip id="solutionLink" type="dark" />

        {getEnrollmentType() !== TrackEnrollType.FORPLACEMENT && <StyledLinkText size={20} weight="normal" data-tip="Evaluations" data-for="evalink">
          <StyledSolutionsLink onClick={showEvaluaions}>Evaluations</StyledSolutionsLink>
        </StyledLinkText>}
        <ReactTooltip id="evalink" type="dark" />


        <ModalComponent
          handleClose={toggleHintModal}
          show={isHintsOpen}
        >
          <Hints hints={questionHints} />
        </ModalComponent>

        <ModalComponent
          handleClose={toggleEvalModal}
          show={isEvaluationsOpen}
        >
          <Evaluations capEvaluations={capEvaluations} />
        </ModalComponent>

        <ModalComponent
          handleClose={toggleSolutionsModal}
          show={isSampleSolutionsOpen}
        >
          <SampleSolutions
            sampleSolutions={sampleSolutions} />
        </ModalComponent>

        <div>
          <Modal
            isOpen={isErrorModalOpen}
            onRequestClose={() => setIsErrorModalOpen(!isErrorModalOpen)}
            style={{ ...modalStyle, content: { ...modalStyle.content, width: '30%' } }}>
            <div>
              <CloseButton onClick={() => setIsErrorModalOpen(!isErrorModalOpen)} />
            </div>
            <ErrorContent>
              <div className="desc">{'You have reached the limit of your current plan. To get an access to more features, you need to choose a higher plan.'}</div>
              <div className="action">
                <Button type="button" onClick={props.goToPaymentPage} className="moreBtn bg--purple text--white text--bold">
                  {'Upgrade'}
                </Button>
              </div>
            </ErrorContent>
          </Modal>
          {showSharedAnswerModal &&
            <ModalComponent
              className="max-width-50"
              handleClose={() => setShowSharedAnswerModal(false)}
              show={showSharedAnswerModal}
            >
              <SharedAnswerComponent questionId={props.question._id} capabilityId={props.capabilityId} setCurrentAnsVersionId={props.setCurrentAnsVersionId} />
            </ModalComponent>}
        </div>
      </div>
    </>
  );
};

export default AnswerHelpLinks;
