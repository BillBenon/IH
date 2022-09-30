import { CreditCard } from '@styled-icons/boxicons-regular/CreditCard';
import { Menu } from '@styled-icons/boxicons-regular/Menu';
import { MenuArrowOutline } from '@styled-icons/evaicons-outline/MenuArrowOutline';
import { QuestionCircle } from '@styled-icons/fa-solid/QuestionCircle';
import { capitalize } from 'lodash';
import React, { useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { RootState } from 'store';
import { getCandidateInfoById, getDetailsForCandidatebyCandidateTrackId, getMenuNotificationAlert } from 'store/evaluationPlatform';
import { getLogoutAction } from 'store/logout';
import { setTrackInfoForPayment } from 'store/payment';
import styled from 'styled-components';
import { IGetCandidateInfoById } from 'types';
import { Candidate_Id, Candidate_Track_Id, Company_Partner, DEFAULT_GET_ANS_STATUS_TIME, DEFAULT_TOKEN, Expert_Login, Flowtype, MENUS, Product_Id, Track_Id } from 'utilities/constants';
import { BlueInterviewHelpLogoIcon } from '../../assets';
import { Logo, StyledLinkText } from '../../components';
import { clearBrowserStorage, getValueBrowserStorage } from '../../services/browserStorageService';
import { camelize, getValidMarket, notEmpty } from '../../utilities';

const StyledHeader = styled.div`
  position: fixed;
  width: 100%;
  background: ${(props: any) => props.background || 'white'};
  transition: 1s;
  height: 57px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .logo {
    margin-left: 20px;
  }
  .logoText {
    line-height: 25px;
    color: #315cd5;
  }
  .logout-button {
    margin-right: 20px;
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .signout-block {
    cursor: pointer;
    margin-right: 1rem;
  }

  .profile-icon {
    background-color: #5b94e3;
    display: inline-block;
    font-size: 22px;
    font-weight: 500;
    color: white;
    position: relative;
    text-align: center;
    height: 32px;
    width: 32px;
    border-radius: 100%;
    overflow: hidden;
  }

  p {
    margin-bottom: 0px;
    margin-top: 6px;
    font-weight: 500;
  }
`;

const CloseButton = styled.button<any>`
  border-radius: 20px;
  width: fit-content;
  height: 36px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
  transition: 0.3s;
  background: '#e9e9e9';
  color: ${(props) => (props.selected ? '#5B94E3' : 'black')};
  padding: 9px 15px;
  cursor: pointer;
  font-family: Khula;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
  overflow: hidden;
`;


const StyledMenuIcon = styled(Menu)`
  font-size: 30px;
  cursor: pointer;
  color: #5b94e3;
  width: 42px;
`;

const StyledMenuArrowIcon = styled(MenuArrowOutline)`
  font-size: 30px;
  cursor: pointer;
  color: #5b94e3;
  width: 38px;
`;

const StyledPopper = styled.div`
  .candidate-info {
    line-height: 100%;
    padding-top: 10px;
  }
  .popover-body{
    display: flex;
    justify-content: center
  }
  .popover-icon {
    background-color: #dbdbdb;
    display: inline-block;
    font-size: 22px;
    font-weight: 500;
    position: relative;
    text-align: center;
    height: 57px;
    width: 59px;
    border-radius: 100%;
    overflow: hidden;
    padding-top: 5px;
    margin: 0 10px;
    color: #5f5f5f;
    font-size: 2rem;
  }
`;

const HR = styled.hr`
  margin: 0 !important;
`;

const ChatLink = styled.div`
  display: flex;
  .chatSupport{
    text-decoration: none;
    color: #212529
  }
`;

const QuestionIcon = styled(QuestionCircle)`
  width: 20px;
  margin: 0 10px 0 0;
  color: #5f5f5f;
`;

const CreditCardIcon = styled(CreditCard)`
  width: 40px;
  color: #5b94e3;
  cursor: pointer;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  .currentTrack {
    text-align: left;
    margin-right: 1rem;
    font-size: 10px;
    
    &.rightside {
      margin-left: 1rem;
    }

    &.leftside {
      position: absolute;
      left: 78px;
    }

    .trackName {
      font-weight: 600;
      font-size: 16px;
    }
  }
`;

const HeaderRight = HeaderLeft;

interface Props {
  children?: any;
  background?: string;
  color?: string;
  className?: string;
  market?: any;
  isMaximizeContent?: boolean;
  handleMaximizeContent?: any;
  candidate: any;
  disable?: boolean;
  updateNotificationStatus?: Function;
  enrollMentType?: string;
}

const _MainHeader: React.FC<Props> = (props: any) => {
  const market = getValidMarket(props.market, { name: 'InterviewHelp', logo: BlueInterviewHelpLogoIcon, theme: '' });
  const history = useHistory();
  const dispatch = useDispatch();
  const expertLogin = (getValueBrowserStorage(Expert_Login) == null) ? false : true;
  const { trackId } = props;

  useEffect(() => {
    if (!notEmpty(props.candidate) && notEmpty(getValueBrowserStorage('candidateId'))) {
      const payload: IGetCandidateInfoById = {
        token: DEFAULT_TOKEN,
        candidateId: (getValueBrowserStorage('candidateId') as string)
      };
      props.getCandidateInfoById(payload).then((res: any) => {
        if (typeof res.payload != "undefined") {
          props.setTrackInfoForPayment({
            trackId: res.payload?.output?.lastCandidateSavedSetting?.trackId,
            trackPlan: res.payload?.output?.lastCandidateSavedSetting?.displayPlanName,
            trackName: res.payload?.output?.lastCandidateSavedSetting?.lastCandidateTrackWorkedOn,
            planState: res.payload?.output?.lastCandidateSavedSetting?.planState
          });
        }
        else {
          logOut();
          history.push({
            pathname: 'login',
          })

        }
      }).catch((err: any) => {
        console.log(err)
      });
    }
  }, [])

  // Calling APi when user is changing the manu
  useEffect(() => {
    getMenuNotification(trackId);
    if (props.updateNotificationStatus) {
      props.updateNotificationStatus();
    }
  }, [trackId])

  // Calling APi to update the notification after specified time interval
  useEffect(() => {
    const interval = setInterval(() => {
      getMenuNotification(trackId);
      if (props.updateNotificationStatus) {
        props.updateNotificationStatus();
      }
    }, DEFAULT_GET_ANS_STATUS_TIME);
    return () => { clearInterval(interval) };
  }, [trackId])

  // Getting the track enrollMentType information if not present 
  useEffect(() => {
    const savedCandidateTrackId = getValueBrowserStorage(Candidate_Track_Id);
    if (!props.enrollMentType && savedCandidateTrackId) {
      props.getDetailsForCandidatebyCandidateTrackId({
        token: DEFAULT_TOKEN,
        candidateTrackId: savedCandidateTrackId,
      })
    }
  }, [])

  const getMenuNotification = async (trackId: string, menu: string = MENUS.ALL) => {
    const candidateId = getValueBrowserStorage(Candidate_Id);
    if (candidateId && trackId) {
      dispatch(getMenuNotificationAlert({ trackId, menu }));
    }
  }

  const handleChat = (e: any) => {
    e.preventDefault()
    window.Tawk_API && window.Tawk_API.toggle()
  }

  const goToPaymentPage = () => {
    if (!expertLogin) {
      history.push({
        pathname: '/settings/payments',
      })
    }
  }

  const logOut = () => {
    dispatch(getLogoutAction());
  }

  const showPaymentIcon = (): boolean => {
    return notEmpty(props.trackId) && (!notEmpty(props.trackPlan) || props.trackPlan == "FREE");
  }

  const goToParent = () => {
    /*
    console.log("go to parent");
    logOut();
    window.close();
    */
    clearBrowserStorage(Candidate_Id);
    clearBrowserStorage(Candidate_Track_Id);
    clearBrowserStorage(Flowtype);
    clearBrowserStorage(Product_Id);
    clearBrowserStorage(Expert_Login);
    clearBrowserStorage(Track_Id);
    clearBrowserStorage(Company_Partner);
  }

  const popover = (
    <Popover id="popover-basic">
      {props.candidate && (
        <StyledPopper>
          <Popover.Title>
            <div className="d-flex popover-title">
              <div className="popover-icon">{props.candidate?.fullname?.charAt(0).toUpperCase()}</div>
              <div className="candidate-info">
                <p className="mb-0"> {props.candidate?.fullname}</p>
                <small className="mb-0 text-secondary"> {props.candidate?.email}</small>
              </div>
            </div>
          </Popover.Title>
          <Popover.Content className="popoverBody">
            <ChatLink>
              <Link className={"chatSupport"} to="/profile">Your Profile</Link>
            </ChatLink>
          </Popover.Content>
          <HR />
          <Popover.Content className="popoverBody">
            <QuestionIcon />
            <ChatLink>
              < a className={"chatSupport"} href="#" onClick={handleChat}>Let us help you</a>
            </ChatLink>
          </Popover.Content>
          <HR />
          <Popover.Content>
            <div className="logout-button text-center">
              <Link to="#" onClick={logOut} style={{ textDecoration: 'none', color: '#212529' }}>
                Sign out
              </Link>
            </div>
          </Popover.Content>
        </StyledPopper>
      )}
    </Popover>
  );

  return (
    <StyledHeader {...props} background={(expertLogin) ? 'yellow' : 'white'}>
      <HeaderLeft>
        {props.isMaximizeContent ? (
          <StyledMenuIcon onClick={props.handleMaximizeContent}></StyledMenuIcon>
        ) : (
          <StyledMenuArrowIcon onClick={props.handleMaximizeContent}></StyledMenuArrowIcon>
        )}
        {notEmpty(props.trackName)
          && <div className="currentTrack leftside">
            {'Current track'}
            <div className="trackName">{props.trackName}</div>
          </div>}
      </HeaderLeft>
      <Logo
        className="logo row"
        logoImage={market.logo}
        imageSize="35px"
        logoText={market.name}
        fontWeight="bold"
        textSize="20px"
        color={props.color || 'white'}
      />
      <HeaderRight>
        <div className="flexrow flex-align-center">
          {notEmpty(props.trackPlan)
            && <div className="currentTrack rightside">
              {'Current plan'}
              <div className="trackName">{capitalize(props.trackPlan)}</div>
            </div>}
          {showPaymentIcon() && (<div className="float-right mr-3">
            <StyledLinkText size={20} weight="normal" data-tip="Plans and Payments" data-for="paymentLink">
              <CreditCardIcon onClick={goToPaymentPage} className="rotate-180" />
            </StyledLinkText>
            <ReactTooltip id="paymentLink" type="dark" />
          </div>)}
          <div className="signout-block">
            {props.candidate && (
              (!expertLogin) ? <OverlayTrigger trigger="click" rootClose data-trigger="focus" placement="bottom" overlay={popover}>
                <div className="flexrow">
                  <p>{camelize(props.candidate?.fullname)} </p>
                  <div className="profile-icon ml-2">{props.candidate?.fullname?.charAt(0).toUpperCase()}</div>
                </div>
              </OverlayTrigger> : <div className="flexrow">
                <p>{camelize(props.candidate?.fullname)} </p>
                <div className="profile-icon ml-2">{props.candidate?.fullname?.charAt(0).toUpperCase()}</div>
              </div>
            )}
          </div>
        </div>
      </HeaderRight>
    </StyledHeader>
  );
};

const mapStateToProps = (state: RootState) => ({
  market: state.evaluationPlatform.market,
  candidate: state.evaluationPlatform.candidate,
  trackId: state.payment.trackId,
  trackPlan: state.payment.trackPlan,
  trackName: state.payment.trackName,
  enrollMentType: state.evaluationPlatform.currentTrack?.candidateTrack[0]?.trackEnrollType
});

const mapDispatchToProps = {
  getDetailsForCandidatebyCandidateTrackId,
  getCandidateInfoById,
  setTrackInfoForPayment
};

export const MainHeader = connect(mapStateToProps, mapDispatchToProps)(_MainHeader);
