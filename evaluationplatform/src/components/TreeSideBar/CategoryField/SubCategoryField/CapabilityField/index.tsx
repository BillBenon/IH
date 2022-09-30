import { FeedbackReceivedIcon } from 'assets';
import _ from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from 'react-tooltip-lite';
import { saveCandidateLastActivity } from 'store/evaluationPlatform';
import styled from 'styled-components';
import { Check } from '@styled-icons/entypo/Check';
import StatusIcon from 'theme/icons/treeSidebar/circleStatusIcon';
import { useMessagePopup } from 'context/messagePopup';
import { useHistory } from 'react-router';
import { LockFill } from "@styled-icons/bootstrap/LockFill";
interface IStyledCapabilityProps {
  selected: boolean;
}

const StyledCapability = styled.div<IStyledCapabilityProps>`
  display: flex;
  align-items: center;
  height: 40px;
  position: relative;
  flex-direction: row;
  cursor: pointer;
  background: ${(props: any) => (props.selected ? '#E3E1E1' : 'transparent')};
  .treesidebar-status-icon {
    width: 17px;
    height: 24px;
    margin-right: 12px;
  }
  .feedback-received-icon {
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
  }
  .capability__name {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #383838;
    margin-right: 20px;
  }
  &::before {
    content: '';
    position: absolute;
    height: 23px;
    border-left: 1px solid #7e7e7e;
    width: 0px;
    left: 8px;
    top: -10px;
  }
  .doneMark{
    width: 26px;
    position: absolute;
    left: 32px;
  }
  .priceTag{
    width: 18px;
    position: absolute;
    left: 32px;
  }
`;

const Styledfeedback = styled.img`
  margin-top: -5px;
  width: 15px;
  height: auto;
  margin-left: -10px;
`

const StyledCheckIcon = styled(Check)`
  width: 27px;
  height: auto;
  color: green;
`;
interface IProps {
  value: {
    capabilityName: string;
    capabilityId: string;
    description: string;
  };
  setCapability: any;
  selectedCapabilityId?: string;
  setScrollPosition: Function;
}

const calculateStatus = (capabilityStatus: any) => {
  const {
    // feedBackRecevied,
    noOfQuestionAttempted,
    numberOfQuestions,
    unAnswered,
    feedbackViewed,
    // savedAnswers,
    // sendForReview,
    // underFeedBackLoop,
    // underReview,
  } = capabilityStatus;
  if (numberOfQuestions === unAnswered) {
    return '#7E7E7E';//grey
  } else if (feedbackViewed === numberOfQuestions) {
    return '#5B94E3';//blue
  } else if (noOfQuestionAttempted > 0) {
    return '#FFA700';//amber
  }
};

const capabilityStatusTooltip: any = {
  '#7E7E7E': 'No response provided by you for this capability',
  '#5B94E3': 'Your work in progress',
  '#FFA700': 'You have provided all response(s) for this capability',
}

export const CapabilityField: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const message = useMessagePopup();
  const history = useHistory();
  const selectedCapabilityId = useSelector((state: any) => state.evaluationPlatform.selectedCapabilityId);
  let selected = selectedCapabilityId === props.value.capabilityId;
  let capabilityStatus = useSelector((state: any) => {
    const capabilityId = props.value.capabilityId;
    const capabilities = state.evaluationPlatform.currentTrack.candidateTrack[0].capabilities;
    const capabilityIdx = _.findIndex(capabilities, ['capabilityId', capabilityId]);
    return capabilities[capabilityIdx].capabilityStatus;
  });
  let status: string = calculateStatus(capabilityStatus) || '';

  const goToPlans = () => {
    history.push({
      pathname: 'settings/payments',
    })
  }

  const handleClick = (capabilityId: string) => {
    if (!capabilityStatus?.numberOfQuestions) {
      const messageText = "Upgrade your plan to unlock all questions";
      message.confirm(messageText, goToPlans, LockFill);
      return;
    }
    props.setScrollPosition({
      capabilityId: selectedCapabilityId,
      scrollTop: window.pageYOffset || document.documentElement.scrollTop
    })
    props.setCapability(capabilityId);
    dispatch(saveCandidateLastActivity({ selectedCapabilityId: capabilityId }))
  };

  return (
    <StyledCapability
      onClick={() => handleClick(props.value.capabilityId)}
      className="capabilityItem"
      selected={selected}
    >
      <div className='doneMark'>
        {capabilityStatus.capabilityAnswerCompleted && <Tooltip content={"Response, Review completed."}>
          <StyledCheckIcon />
        </Tooltip>}
      </div>
      {!capabilityStatus?.numberOfQuestions && <div className='priceTag'>
        <Tooltip content={'Upgrade plan to view this capability'}>
          <LockFill fill={'#5b94e3'} />
        </Tooltip>
      </div>}
      <span className="treesidebar-status-icon">
        <Tooltip content={capabilityStatusTooltip[status]}>
          <StatusIcon fill={status} />
        </Tooltip>
      </span>
      <div className="capability__name">{props.value.capabilityName}</div>
      <span className="feedback-received-icon">
        {capabilityStatus.feedBackRecevied > 0 && (
          <span title="Feedback Received"><Styledfeedback src={FeedbackReceivedIcon} /></span>
        )}
      </span>
    </StyledCapability>
  );
};
