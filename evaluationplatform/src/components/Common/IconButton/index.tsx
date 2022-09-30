import { Badge } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import styled from 'styled-components';
import { DefaultNotificationMeg as DefMsg } from 'utilities/constants';

const TOOLTIP_PLACEMENT = "right";
const GETMESSAGE_TIME = 3000;

const StyledIconButton = styled.div<any>`
  display: flex;
  flex-direction: column;
  height: 100%;
  filter: ${(props) => (props.disable ? 'opacity(25%)' : 'unset')};

  .iconText {
    font-family: Khula;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    color: ${(props: any) => props.fill};
  }
  .subText {
    color: #dc3545;
    font-size: 12px;
    font-style: italic;
  }
`;

interface Prop {
  icon?: any;
  fill?: string;
  iconText?: string;
  className?: string;
  disable?: boolean;
  badgeContent?: string | number;
  title?: string;
  onClick?: Function;
  subText?: string;
  showNotification?: boolean
  getNotificationMsgFromAPI?: Function
  menu?: string
}

const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 300, backgroundColor: "black", padding: "0.8rem", fontSize: "10px",
    letterSpacing: "1px"
  }
}));

const CustomWidthTooltip = (props: any) => {
  const classes = useStyles();
  return (
    <div onMouseEnter={() => { props.onMouseEnter() }} onMouseLeave={() => { props.onMouseLeave() }}>
      <Tooltip title={props.alertDescription} classes={{ tooltip: classes.customWidth }} placement={TOOLTIP_PLACEMENT} arrow>
        {props.children}
      </Tooltip>
    </div>
  )
};

export const IconButton: React.FC<Prop> = (props) => {

  let timeOutRef: any = null;

  const getNotificationMsgFromAPI = () => {
    if (props.showNotification && !props.badgeContent) {
      clearTimeInterval();
      timeOutRef = setTimeout(() => {
        props.getNotificationMsgFromAPI && props.getNotificationMsgFromAPI(props.menu);
      }, GETMESSAGE_TIME);
    }
  }

  const clearTimeInterval = () => {
    timeOutRef && clearTimeout(timeOutRef)
  };

  const getDefaultMsg = (): string => {
    let key = props.menu ? props.menu : '';
    if (DefMsg[key]) {
      return DefMsg[key];
    }
    return '';
  }

  const Icon = props.icon;
  return (
    <CustomWidthTooltip onMouseEnter={getNotificationMsgFromAPI} onMouseLeave={clearTimeInterval}
      alertDescription={(props.showNotification && props.badgeContent) ? props.badgeContent : getDefaultMsg()}>
      <StyledIconButton onClick={props.onClick} title={props.title} disable={props.disable} fill={props.fill}>
        <div>
          {/* <img className="iconImage" src={props.icon} alt="icon_button" /> */}
          <Badge invisible={!props.showNotification} color="secondary" variant="dot" >
            <Icon height={"38px"} fill={props.fill} color={props.fill} />
          </Badge>
        </div>
        <div className="iconText">{props.iconText}</div>
        {props.subText && <div className="subText">({props.subText})</div>}
      </StyledIconButton>
    </CustomWidthTooltip>
  );
};
