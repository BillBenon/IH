import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Attachment } from '@styled-icons/entypo/Attachment';
import { IconButton } from '@material-ui/core';
import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';
import { getModalDefaultSettings } from 'utilities';
import SketchingEditor from 'components/Common/Editors/SketchingEditor';
import { evaluationPlatformService } from 'services';
import { DEFAULT_TOKEN } from 'utilities/constants';
import { useLoader } from 'context/loaderDots';

const StyledFeedback = styled.div`
  position: relative;
    margin-top: 10px;
    .ql-editor{
      height: auto;
    }
  .attachment{
    z-index: 2;
    position: absolute;
    right: 0.75em;
    bottom: 0.75em;
    :focus{
        outline: 0 !important;
      }
  }
  .profile-icon {
    float: left;
    z-index: 100;
    margin-left: -50px !important;
    margin-top: 5px;
    width: 35px;
    background-color: #5B94E3;
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    color: white;
    position: relative;
    text-align: center;
    height: 30px;
    border-radius: 100%;
    overflow: hidden;
    padding: 4px;
  }
`;

const StyledAttachmentIcon = styled(Attachment) <{ isSketchAvailable: boolean }>`
  color: ${(props: any) => props.isSketchAvailable ? '#5B94E3' : 'grey'};
  width: 24px;
  transform: rotate(315deg);
`

interface IProps {
  feedback: any;
  candidateTrackId: string;
  questionTitle: string;
  expertName?: string;
}

export const FeedbackField: React.FC<IProps> = (props) => {
    const loader = useLoader()
  const [sketchModal, setSketchModal] = useState<boolean>(false)
  const feedback = props.feedback;

  const expert = useSelector(
    (state: any) => state.evaluationPlatform.currentTrack?.candidateTrack[0].experts.find((expert:any) => expert._id === feedback.expertId))
  
  const getSketch = () => {
    loader.showLoader()
    return evaluationPlatformService.getExpertSketchAnswer({
      token: DEFAULT_TOKEN,
      candidateTrackId: props.candidateTrackId,
      questionAnswerId: props.feedback.questionAnswerId,
      questionId: props.feedback.questionId,
      expertId:props.feedback.expertId,
      feedbackId: props.feedback._id
    }).finally(() => loader.hideLoader())
  }

  const isSketchAvailable = props.feedback?.sketchAvailable;
  return (
    <StyledFeedback>
      <div className='profile-icon ml-1' data-for='expert-name' data-tip={props.expertName || expert?.fullname}>
        {(props.expertName || expert?.fullname)?.charAt(0).toUpperCase()}
      </div>
      <ReactTooltip id='expert-name' place="left" type="dark" />
      {isSketchAvailable && <IconButton
        className={'attachment'}
        data-tip="System Design"
        data-for="expertsketch"
        onClick={() => setSketchModal(true)}>
        <ReactTooltip id="expertsketch" type="dark" />  
        <StyledAttachmentIcon
          isSketchAvailable={isSketchAvailable || false} />
      </IconButton>}
      <RichTextEditor
        disabled={true}
        id={feedback?._id}
        value={feedback?.feedback}
      />
      <Modal
        isOpen={sketchModal}
        style={{
          ...getModalDefaultSettings('80%'),
          content: {
            ...getModalDefaultSettings('80%').content,
            height: '80%',
            padding: '10px',
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'column'
          }
        }}>
        <div className="question__title" style={{ width: '100%' }}>
          <span>Q: {props.questionTitle}</span>
        </div>
        <SketchingEditor
          id='expertSketch'
          disabled={true}
          isSketchAvailable={isSketchAvailable || false}
          CloseModal={() => setSketchModal(false)}
          getSketch={getSketch}
        />
      </Modal>
    </StyledFeedback>
  );
};
