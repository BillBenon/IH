import { Dashboard } from '@styled-icons/boxicons-solid/Dashboard';
import { ChalkboardTeacher } from "@styled-icons/fa-solid/ChalkboardTeacher";
import { PeopleArrows } from "@styled-icons/fa-solid/PeopleArrows";
import { PeopleCommunity } from "@styled-icons/fluentui-system-filled/PeopleCommunity";
import { DocumentPerson } from "@styled-icons/fluentui-system-regular/DocumentPerson";
import { Settings } from '@styled-icons/material/Settings';
// import DashboardIcon from 'assets/icons/outerSidebar/dashboard.png';
import { Suitcase } from "@styled-icons/fa-solid/Suitcase";
import { Googleclassroom } from "@styled-icons/simple-icons/Googleclassroom";
import { IconButton } from 'components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { RootState } from 'store';
import { getNotificationMsg } from "store/evaluationPlatform";
import styled from 'styled-components';
import { ListIcon } from 'theme/icons';
import { notEmpty } from 'utilities';
import { Candidate_Id, Expert_Login, MENUS, PlanType } from 'utilities/constants';
import { isPlacementTrack } from "utilities/helperFunctions";

enum ActiveButtonStates {
  DASHBOARD = 1,
  QUESTION = 2,
  VIDEOS = 3,
  SETTINGS = 4,
  COMMUNITY = 5,
  CONSULTANCY = 6,
  RESUMEREVIEW = 7,
  HIRINGECOSYSTEM = 8,
  CLASSES = 9,
}

const StyledDashboardIcon = styled(Dashboard)`
  width: 35px;
  height: auto;
`;

const StyledSettings = styled(Settings)`
  width: 38px;
  height: auto;
`;

const StyledSidebar = styled.div<any>`
  position: fixed;
  display: flex;
  opacity: ${(props) => (props.isMaximizeContent ? 0 : 1)};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 78px;
  transition: opacity 1s;
  height: 100%;
  background: #dbdbdb;
  div {
    background: #dbdbdb;
  }
  .profileIcon {
    margin-top: 32px;
  }
  .profileIcon div {
    background: white;
    border-radius: 50%;
    width: 43px;
    height: 43px;
  }
  .dashboardText {
    font-size: 12px;
  }
  .consultancyIcon {
    margin-top: 58px;
  }
  .mt-6 {
    margin-top: 4.5rem;
  }
  & a:hover path {
    fill: ${(props) => (!props.disable ? '#5b94e3 ' : 'initial')};
  }
  
  & a:hover .iconText {
    color: ${(props) => (!props.disable ? '#5b94e3 ' : 'initial')};
  }
  & a {
    text-decoration: none;
    color: black;
    pointer: ${(props) => (props.disable ? 'none' : 'pointer')};
    pointer-events: ${(props) => (props.disable ? 'none' : 'unset')};
  }
`;

interface Props {
  className?: string;
  isMaximizeContent?: boolean;
  disable?: boolean;
}

const TopIconButtonGroup = styled.div`
  overflow-y: auto;
  margin-top: 70px;
  & a {
    text-decoration: none;
  }
`;

// const ProfileButton = () => (
//   <div className="profileIcon">
//     <div />
//   </div>
// );

const DashboardButton = (props: any) => {
  const content = (
    <div className="mb-3">
      <IconButton icon={StyledDashboardIcon} iconText="Dashboard" disable={props.disable} fill={props.color} badgeContent={props.msg}
        showNotification={props.showNotification} getNotificationMsgFromAPI={props.getNotificationMsgFromAPI} menu={MENUS.DASHBOARD} />
    </div>
  )
  return props.disable ? content : <Link to={props.disable ? '#' : '/dashboard'}>{content}</Link>
};

const TracksButton = (props: any) => {
  let iconText = isPlacementTrack() ? "Questions" : "Track";
  const content = (
    <div className="mb-3">
      <IconButton icon={ListIcon} iconText={iconText} disable={props.disable} fill={props.color} badgeContent={props.msg}
        showNotification={props.showNotification} getNotificationMsgFromAPI={props.getNotificationMsgFromAPI} menu={MENUS.TRACK} />
    </div>
  );

  return props.disable ? content : <Link to={props.disable ? '#' : '/question'}>{content}</Link>
};

const TalkToExpertButton = (props: any) => {
  const content = (
    <div className="mb-3">
      <IconButton badgeContent={props.msg} icon={ChalkboardTeacher} iconText="Mock & Coaching" disable={props.disable} fill={props.color}
        showNotification={props.showNotification} getNotificationMsgFromAPI={props.getNotificationMsgFromAPI} menu={MENUS.MOCK_AND_COACHING} />
    </div>
  )

  return props.disable ? content : <Link to={props.disable ? '#' : '/meetings'}>{content}</Link>
};

const CareerConsultancyButton = (props: any) => {
  const content = (
    <div className="mb-3">
      <IconButton icon={PeopleArrows} iconText="Career Consultancy" disable={props.disable} fill={props.color} subText={props.subText}
        showNotification={props.showNotification} getNotificationMsgFromAPI={props.getNotificationMsgFromAPI} menu={MENUS.CAREER_CONSULTANCY}
        badgeContent={props.msg} />
    </div>
  )

  return props.disable ? content : <Link to={props.disable ? '#' : '/consultancy'}>{content}</Link>
};

const CommunityButton = (props: any) => {
  const content = (
    <div className="d-flex justify-content-center py-4 px-1">
      <IconButton icon={PeopleCommunity} iconText="Community" disable={props.disable} fill={props.color}
        showNotification={props.showNotification} getNotificationMsgFromAPI={props.getNotificationMsgFromAPI} menu={MENUS.COMMUNITY}
        badgeContent={props.msg} />
    </div>
  )

  return props.disable ? content : <Link to={props.disable ? '#' : '/community'}>{content}</Link>
};

const SettingsButton = (props: any) => {
  const content = (
    <div className="mb-4">
      <IconButton icon={StyledSettings} disable={props.disable} iconText="Settings" fill={props.color}
        showNotification={props.showNotification} getNotificationMsgFromAPI={props.getNotificationMsgFromAPI} menu={MENUS.SETTINGS}
        badgeContent={props.msg} />
    </div>
  )
  return props.disable ? content : <Link to={props.trackStatus ? '/settings/tracks' : '/settings'}>{content}</Link>
};

const ResumeResume = (props: any) => {
  const content = (
    <div className="d-flex justify-content-center">
      <IconButton icon={DocumentPerson} iconText="Resume Services" disable={props.disable} fill={props.color}
        showNotification={props.showNotification} getNotificationMsgFromAPI={props.getNotificationMsgFromAPI} menu={MENUS.RESUME_SERVICES}
        badgeContent={props.msg} />
    </div>
  )

  return props.disable ? content : <Link to={props.disable ? '#' : '/resume-review'}>{content}</Link>
}

const HiringEcoSystem = (props: any) => {
  const content = (
    <div className="d-flex justify-content-center">
      <IconButton icon={Suitcase} iconText="Hiring Ecosystem" disable={props.disable} fill={props.color}
        showNotification={props.showNotification} getNotificationMsgFromAPI={props.getNotificationMsgFromAPI} menu={MENUS.HIRING_ECOSYSTEM}
        badgeContent={props.msg} />
    </div>
  )

  return props.disable ? content : <Link to={props.disable ? '#' : '/hiring-ecosystem'}>{content}</Link>
}

const Classes = (props: any) => {
  const content = (
    <div className="d-flex justify-content-center mb-3">
      <IconButton icon={Googleclassroom} iconText="Classes" disable={props.disable} fill={props.color} />
    </div>
  )

  return props.disable ? content : <Link to={props.disable ? '#' : '/classes'}>{content}</Link>
}

export const Sidebar: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState<ActiveButtonStates>(ActiveButtonStates.SETTINGS);
  const { trackId, trackPlan } = useSelector((state: RootState) => state.payment);
  const { badges } = useSelector((state: RootState) => state.evaluationPlatform);
  const enrollmentType = useSelector((state: RootState) => state.evaluationPlatform.currentTrack?.candidateTrack[0]?.trackEnrollType);
  const expertLogin = (getValueBrowserStorage(Expert_Login) == null) ? false : true;

  useEffect(() => {
    setActiveButtonState();
  }, [trackId]);

  const setActiveButtonState = () => {
    switch (location.pathname) {
      case '/dashboard':
        setActiveButton(ActiveButtonStates.DASHBOARD);
        break;
      case '/question':
        setActiveButton(ActiveButtonStates.QUESTION);
        break;
      case '/meetings':
        setActiveButton(ActiveButtonStates.VIDEOS);
        break;
      case '/settings':
        setActiveButton(ActiveButtonStates.SETTINGS);
        break;
      case '/community':
        setActiveButton(ActiveButtonStates.COMMUNITY);
        break;
      case '/consultancy':
        setActiveButton(ActiveButtonStates.CONSULTANCY);
        break;
      case '/resume-review':
        setActiveButton(ActiveButtonStates.RESUMEREVIEW);
        break;
      case '/hiring-ecosystem':
        setActiveButton(ActiveButtonStates.HIRINGECOSYSTEM);
        break;
      case '/classes':
        setActiveButton(ActiveButtonStates.CLASSES);
        break;
    }
  }

  const getActiveColor = (state: ActiveButtonStates): string => {
    return activeButton === state ? '#5b94e3' : 'default';
  }

  const getNotificationStatus = (fieldName: string): boolean => {
    if (badges?.notifications?.[fieldName]) {
      return badges.notifications[fieldName]['status'];
    }
    return false;
  }

  const getNotificationMsgFromAPI = async (menu: string = MENUS.ALL) => {
    const candidateId = getValueBrowserStorage(Candidate_Id);
    if (candidateId && trackId) {
      dispatch(getNotificationMsg({ trackId, menu }));
    }
  }

  const getTxtNotificationMsg = (menu: string): any => {
    if (badges?.notifications?.[menu]?.message?.length > 0) {
      const messages: string[] = badges.notifications[menu].message;
      let txtMsg = (
        <div>
          {messages.map((msg, idx) => {
            return (<div key={idx + msg}>{(idx + 1) + ". " + msg}</div>)
          })}
        </div>
      );
      return txtMsg;
    }
    return '';
  }

  return (
    <StyledSidebar {...props} className={`${enrollmentType ? '' : 'justify-content-end'}`}>
      {enrollmentType && <TopIconButtonGroup className='d-flex flex-column align-items-center justify-content-start flex-grow-1'>
        {/* <ProfileButton /> */}
        <DashboardButton disable={!notEmpty(trackId)} msg={getTxtNotificationMsg(MENUS.DASHBOARD)}
          color={getActiveColor(ActiveButtonStates.DASHBOARD)}
          showNotification={getNotificationStatus(MENUS.DASHBOARD)} getNotificationMsgFromAPI={getNotificationMsgFromAPI} />
        <TracksButton disable={!notEmpty(trackId)} color={getActiveColor(ActiveButtonStates.QUESTION)}
          msg={getTxtNotificationMsg(MENUS.TRACK)} trackPlan={trackPlan}
          showNotification={getNotificationStatus(MENUS.TRACK)} getNotificationMsgFromAPI={getNotificationMsgFromAPI} />
        {!isPlacementTrack() && <>
          <Classes disable={expertLogin} color={getActiveColor(ActiveButtonStates.CLASSES)} />
          <TalkToExpertButton disable={expertLogin} msg={getTxtNotificationMsg(MENUS.MOCK_AND_COACHING)}
            color={getActiveColor(ActiveButtonStates.VIDEOS)}
            showNotification={getNotificationStatus(MENUS.MOCK_AND_COACHING)} getNotificationMsgFromAPI={getNotificationMsgFromAPI} />
          <CareerConsultancyButton getNotificationMsgFromAPI={getNotificationMsgFromAPI} msg={getTxtNotificationMsg(MENUS.CAREER_CONSULTANCY)}
            showNotification={getNotificationStatus(MENUS.CAREER_CONSULTANCY)} disable={expertLogin}
            color={getActiveColor(ActiveButtonStates.CONSULTANCY)}
            subText={trackPlan === PlanType.Free && 'Free'}
          />
        </>}
        <ResumeResume showNotification={getNotificationStatus(MENUS.RESUME_SERVICES)} getNotificationMsgFromAPI={getNotificationMsgFromAPI}
          msg={getTxtNotificationMsg(MENUS.RESUME_SERVICES)}
          color={getActiveColor(ActiveButtonStates.RESUMEREVIEW)}
        />

        {!isPlacementTrack() && <>
          <CommunityButton disable={expertLogin} color={getActiveColor(ActiveButtonStates.COMMUNITY)}
            msg={getTxtNotificationMsg(MENUS.COMMUNITY)}
            showNotification={getNotificationStatus(MENUS.COMMUNITY)} getNotificationMsgFromAPI={getNotificationMsgFromAPI} />
        </>}
        <HiringEcoSystem disable={expertLogin} color={getActiveColor(ActiveButtonStates.HIRINGECOSYSTEM)}
          msg={getTxtNotificationMsg(MENUS.HIRING_ECOSYSTEM)}
          showNotification={getNotificationStatus(MENUS.HIRING_ECOSYSTEM)} getNotificationMsgFromAPI={getNotificationMsgFromAPI} />
      </TopIconButtonGroup>}
      <SettingsButton trackStatus={!notEmpty(trackId)} disable={expertLogin} color={getActiveColor(ActiveButtonStates.SETTINGS)}
        msg={getTxtNotificationMsg(MENUS.SETTINGS)}
        showNotification={getNotificationStatus(MENUS.SETTINGS)} getNotificationMsgFromAPI={getNotificationMsgFromAPI} />
    </StyledSidebar>
  );
};
