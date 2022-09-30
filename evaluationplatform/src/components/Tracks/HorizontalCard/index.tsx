import React, { useState } from 'react';
import { ViewDetailModal } from './../../Modals/ViewDetailModal';
import Modal from 'react-modal';
import styled from 'styled-components';
import Chip from 'components/Common/Chips';
import { notEmpty } from 'utilities';
import { TrackEnrollType } from 'utilities/constants';
import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { FileVideo } from '@styled-icons/fa-solid/FileVideo';

const StyledHorizontalCard = styled.div`
  position: relative;
  min-height: 325px;
  width: 360px;
  margin-bottom: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  transition: 0.3s;
  background: #f9fafc;
  border-radius: 16px;
  margin-right: 24px;
  &:hover {
    box-shadow: 0 16px 25px 0 rgba(0, 0, 0, 0.5);
  }
  .horizontal__card__icon {
    align-self: center;
    img{
      height: 90px;
    }
    margin-bottom: 16px;
  }
  .horizontal__card__body {
    width: 100%;
    height: 100%;
    color: #000;
    flex-grow: 1;
    background: unset;
    .ql-editor{
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ql-snow{
      background: #f9fafc;
    }
  }
  .title {
    font-family: Khula;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    color: #000000;
    text-align: left;
  }
  .text {
    margin-top: 10px 0;
    font-family: Khula;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    text-align: justify;
    letter-spacing: 0.32px;
    color: rgba(0, 0, 0, 0.74);
    height: 155px;
  }

  .view_more_link {
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.16px;
    text-decoration-line: underline;
    color: #5b94e3;
    cursor: pointer;
    float: right;
  }

  .horizontal__card__foot {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  .videoIcon {
    height: 25px;
    margin-left: 15px;
    cursor: pointer;
    animation: rotation 5s infinite linear;
  }

  .videoIcon path {
     color: red;
  }
`;

const StyledFooter = styled.div`
width: 101px;
height: 33px;
border: 1px solid #5b94e3;
box-sizing: border-box;
border-radius: 48px;
display: flex;
align-items: center;
justify-content: center;

&:hover {
color: #fff;
background: #5b94e3;
}

span {
  cursor: pointer;
  font-family: Khula;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  letter-spacing: 0.16px;
  line-height: 2.5;
  color: #5b94e3;
  height: 100%;
  width: 100%;
  &:hover {
    color: #fff;
    }
`;

interface Props {
  icon: string;
  title: string;
  video?: string;
  detailsDescription: string;
  handleClick?: any;
  item?: any;
  isPlacementView?: boolean;
}

export const HorizontalCard: React.FC<Props> = (props) => {
  const [isShowViewModal, setIsShowViewModal] = useState(false);
  const currentTrackId = getValueBrowserStorage('candidateTrackId');
  const trimDescription = (string: any) => {
    //Assuming the description to cover atleast 7 lines or 280 char long
    return string?.substring(0, Math.min(string.length, 280));
  };

  const Button = (props: any) => (
    <StyledFooter>
      <span onClick={props.handleClick}>{props.displayText}</span>
    </StyledFooter>
  );

  return (
    <StyledHorizontalCard {...props}>
      <div className="horizontal__card__icon">
        <img src={props.icon} alt="track_icon" />
      </div>
      <div className="horizontal__card__body">
        <div className="title">{props.title}
          {props.video ?
            <FileVideo onClick={() => window.open(props.video, "_blank")} className="videoIcon"></FileVideo>

            : ''}
        </div>
        <div className="text">
          <RichTextEditor
            doNotAllowCopy={true}
            disabled={true}
            id={`tracksRTE-${props.item?.trackId}`}
            value={`${props.detailsDescription}`}
            customStyles={{ height: '150px', resize: 'none', boxShadow: 'none' }}
          />
          <span className="view_more_link" onClick={() => setIsShowViewModal(!isShowViewModal)}>
            View More Details
          </span>
        </div>
      </div>
      <div className="horizontal__card__foot">
        <Button
          handleClick={() => props.handleClick(props.item.candidateTrackId === currentTrackId)}
          displayText={
            props.item.candidateTrackId
              ? props.item.candidateTrackId === currentTrackId
                ? (props.isPlacementView ? 'View Job' : 'View Track')
                : (props.isPlacementView ? 'Select Job' : 'Select Track')
              : props.isPlacementView ? 'Apply Now'
                : props.item.trackEnrollType === TrackEnrollType.mustBuy ? 'Buy' : 'Enroll'
          }
          item={props.item}
        />
        {notEmpty(props.item?.plan) &&
          <Chip value={props.item.displayPlanName + (notEmpty(props.item.planState) ? ' (' + props.item.planState + ')' : '')} />}
      </div>
      {/* icon is temporary, ideally logo url should be passed from the api */}
      <ViewDetailModal
        Modal={Modal}
        isShowViewModal={isShowViewModal}
        setIsShowViewModal={() => setIsShowViewModal(!isShowViewModal)}
        item={props.item || {}}
        icon={props.icon}
      />
    </StyledHorizontalCard>
  );
};
