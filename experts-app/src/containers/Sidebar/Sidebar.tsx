import React from "react";
import { IconButton } from "../../components/Common/IconButton";
import { Link, useLocation } from "react-router-dom";
import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard";
import { Settings } from "@styled-icons/material/Settings";
import styled from "styled-components";
import { MenuItems, B2B_MenuItems, Menuwidth, RouterMap, RoleType } from "../../utilities/constants";
import { Profile } from "@styled-icons/remix-fill/Profile";
import { Youtube } from "@styled-icons/boxicons-logos/Youtube";
import { Group } from "styled-icons/boxicons-solid";
import { MeetingIcon } from "../../theme/icons";
import { Team } from '@styled-icons/remix-fill/Team';
import { Work } from '@styled-icons/material-rounded/Work';
import { Notifications } from '@styled-icons/material-sharp/Notifications';
import { useRoleProvider } from "providers/userRoleProvider";

const StyledDashboardIcon = styled(Dashboard)`
  width: 35px;
  height: auto;
  &:hover{
    fill:#5B94E3;
  }
`;

const StyledSettings = styled(Settings)`
  width: 38px;
  height: auto;
  &:hover{
    fill:#5B94E3;
  }
`;

const StyledProfileIcon = styled(Profile)`
  width: 38px;
  height: auto;
  &:hover{
    fill:#5B94E3;
  }
`;

export const YoutubeIcon = styled(Youtube)`
  width: 38px;
  height: auto;
  &:hover{
    fill:#5B94E3;
  }
`;

const StyledSidebar = styled.div`
  position: fixed;
  top:4em;
  display: flex;
  margin-left: ${(props: any) => (props.isMaximizeContent ? -Menuwidth + 'px' : 0)};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  width: ${Menuwidth + 'px'};;
  transition: 0.5s;
  height: 100%;
  background: rgba(91, 148, 227, 0.08);
  .profileIcon {
    margin-top: 32px;
  }
  .profileIcon div {
    background: white;
    border-radius: 50%;
    width: 43px;
    height: 43px;
  }
  & a:visited .iconText {
    color: rgba(23, 23, 23, 0.6);
  }
  & a:hover .iconText {
    color: #5B94E3;
  }
  & a {
    text-decoration: none;
    color: rgba(23, 23, 23, 0.6);
  }
`;

interface Props {
  className?: string;
  isMaximizeContent?: boolean;
}

const TopIconButtonGroup = styled.div`
  & a {
    text-decoration: none;
  }
`;

const DashboardButton = (props: { fill: string }) => (
  <Link className={'mr-3 borderedHover'} to="/dashboard">
    <IconButton fill={props.fill} icon={StyledDashboardIcon} iconText="Dashboard" />
  </Link>
);

const TracksButton = (props: { fill: string }) => (
  <Link className={'mr-3 borderedHover'} to="/submissions">
    <IconButton fill={props.fill} icon={StyledProfileIcon} iconText="Submissions" />
  </Link>
);

const VideoButton = (props: { fill: string }) => (
  <Link className={'mr-3 borderedHover'} to="/videos">
    <IconButton fill={props.fill} icon={YoutubeIcon} iconText="Videos" />
  </Link>
);
/*
style={{
    float: 'right',
    width: '50px'
  }}
*/
const YourCandidatesButton = (props: { fill: string }) => (
  <Link className={'mr-3 borderedHover'} to="/your-candidates">
    <IconButton fill={props.fill} icon={Group} iconText="Your Candidates" />
  </Link>
);

const MeetingsButton = (props: { fill: string }) => (
  <Link className={'mr-3 borderedHover'} to="/your-meetings">
    <IconButton fill={props.fill} icon={MeetingIcon} iconText="Your Meetings" />
  </Link>
);

const SettingsButton = (props: { fill: string }) => (
  <Link style={{
    position: 'absolute',
    bottom: '5em',
    left: '0',
    right: '0',
  }} to="/settings">
    <IconButton fill={props.fill} icon={StyledSettings} iconText="Settings" />
  </Link>
);

const ClassesButton = (props: { fill: string }) => (
  <Link className={'mr-3 borderedHover'} to="/classes">
    <IconButton fill={props.fill} icon={MeetingIcon} iconText="Classes" />
  </Link>
);

const ButtonRender = ({ fill, icon, path, text }: { fill: string, icon: any, path: string, text: string }) => (
  <Link className={'mr-3 borderedHover'} to={path}>
    <IconButton fill={fill} icon={icon} iconText={text} />
  </Link>
)

const SideBarButtonsForExpert = () => {
  const { pathname } = useLocation();
  return (
    <>
      <DashboardButton fill={getButtonColor(pathname, RouterMap[MenuItems.dashboard])} />
      <TracksButton fill={getButtonColor(pathname, RouterMap[MenuItems.submission])} />
      <VideoButton fill={getButtonColor(pathname, RouterMap[MenuItems.video])} />
      <MeetingsButton fill={getButtonColor(pathname, RouterMap[MenuItems.yourMeetings])} />
      <YourCandidatesButton fill={getButtonColor(pathname, RouterMap[MenuItems.yourCandidates])} />
      <SettingsButton fill={getButtonColor(pathname, RouterMap[MenuItems.settings])} />
      <ClassesButton fill={getButtonColor(pathname, RouterMap[MenuItems.classes])} />
    </>
  )
}

const getButtonColor = (pathname: string, route: string) => {
  return pathname === route ? '#5B94E3' : 'rgba(23, 23, 23, 0.6)';
}

const SideBarButtonsForHiringManager = () => {
  const { pathname } = useLocation();
  return (
    <>
      <ButtonRender icon={Work} path={'/jobs'} text={'Jobs'} fill={getButtonColor(pathname, RouterMap[B2B_MenuItems.jobs])} />
      <ButtonRender icon={Notifications} path={'/my-desk'} text={'My Desk'} fill={getButtonColor(pathname, RouterMap[B2B_MenuItems.myDesk])} />
      <ButtonRender icon={Team} path={'/candidate-search'} text={'Candidates Search'} fill={getButtonColor(pathname, RouterMap[B2B_MenuItems.candidateSearch])} />
      <SettingsButton fill={getButtonColor(pathname, RouterMap[MenuItems.settings])} />
    </>
  )
}

export const Sidebar: React.FC<Props> = (props) => {
  const { isHiringManagerUser } = useRoleProvider();
  if (isHiringManagerUser === undefined) return <></>;
  const SideBarButtons = isHiringManagerUser ? SideBarButtonsForHiringManager : SideBarButtonsForExpert;
  return (
    <StyledSidebar className={'p-3'} {...props}>
      <TopIconButtonGroup>
        <SideBarButtons />
      </TopIconButtonGroup>
    </StyledSidebar>
  );
};
