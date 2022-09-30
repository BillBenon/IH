import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ButtonsBar } from '../../components/Common/ButtonsBar';
import './styles.css';
import { PastMeeting } from './tab/PastMeetings';
import { UpcomingMeeting } from './tab/UpcomingMeetings';
import CompletedMeetings from './tab/CompletedMeetings';
import MeetingDetailsComponent from "./tab/MeetingDetailsComponent";
import { useLocation } from 'react-router-dom';
import { UserReceived } from "@styled-icons/remix-fill/UserReceived";
import { useHistory } from "react-router";
import { IconContainer } from '../../components/Common/IconContainer/IconContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ReviewStatus } from '../../utilities/constants';

const MeetingWrapper = styled.div`
  margin: 10px;
`;

const Buttons = {
  UPCOMING: "upcoming",
  PAST: "past",
  COMPLETED: "completed",
}

interface IPageButtons {
  label: string;
  value: string;
  children?: any;
}

const PageButtons: IPageButtons[] = [
  { label: 'Upcoming Meetings', value: Buttons.UPCOMING },
  { label: 'Past Meetings', value: Buttons.PAST },
  { label: 'Completed Meetings', value: Buttons.COMPLETED },
]

export const Meeting: React.FC = () => {
  const expertId = useSelector((state: RootState) => state.auth.user.expertId);
  const [selectedButton, setSelectedButton] = useState<string>('');
  const meetings = useSelector((state: RootState) => state.meeting.meetings);
  const { search } = useLocation();
  const meetingDetailId = new URLSearchParams(search).get('meetingDetailId');
  const history = useHistory();
  const [update, forceUpdate] = useState<boolean>(false);

  const btnSelectHandler = (selectedValue: any) => {
    setSelectedButton(selectedValue);
    history.replace({
      pathname: '/your-meetings',
    });
  }

  const navigateToCompletedMeetings = () => {
    setSelectedButton(Buttons.COMPLETED);
  }

  const setIconInButtonBar = (buttonType: string) => {
    const meetingObj = PageButtons.find(b => b.value === buttonType);
    if (meetingObj) {
      meetingObj.children = <IconContainer icon={UserReceived} tooltip="Feedback Received" />
      forceUpdate(!update);
    }
  }

  useEffect(() => {
    if (!meetingDetailId) {
      setSelectedButton(PageButtons[0].value);
    }
  }, [])

  useEffect(() => {
    if (meetings && meetings.length) {
      const meetingsWithFeedbackSent = meetings.filter(m => m.candidateFeedback && m.reviewStatus !== ReviewStatus.expertViewedReview);
      if (meetingsWithFeedbackSent.length) {
        setIconInButtonBar(selectedButton)
      }
    }
  }, [meetings])

  return (
    <MeetingWrapper>
      <ButtonsBar
        buttonsInfo={PageButtons}
        selectedPage={selectedButton}
        onClickHandler={btnSelectHandler}
      />
      <div className="content">
        {meetingDetailId ? <MeetingDetailsComponent /> : <>
          {selectedButton === Buttons.UPCOMING && expertId && <UpcomingMeeting />}
          {selectedButton === Buttons.PAST && <PastMeeting navigateToCompletedMeetings={navigateToCompletedMeetings} />}
          {selectedButton === Buttons.COMPLETED && <CompletedMeetings />}
        </>}
      </div>
    </MeetingWrapper>
  );
};