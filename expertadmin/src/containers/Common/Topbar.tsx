import { Menu } from '@styled-icons/boxicons-regular/Menu';
import { MenuArrowOutline } from '@styled-icons/evaicons-outline/MenuArrowOutline';
import { QuestionCircle } from '@styled-icons/fa-solid/QuestionCircle';
import { BlueInterviewHelpLogoIcon } from 'assets';
import { AppLogo } from 'components/AppLogo';
import { PopoverIcon } from 'components/PopoverIcon';
import { useMenuVisibility } from 'context/menuVisibility';
import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Expert } from 'types';
import { MenuWidth } from 'utils/constants';

const StyledHeader = styled.div`
  top: 0;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1030;
  background: #fff;
  height: 60px;
  transition: 0.5s;
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
  }

  .profile-icon {
    background-color: #5b94e3;
    display: inline-block;
    font-weight: 500;
    color: white;
    position: relative;
    text-align: center;
    height: 32px;
    width: 32px;
    border-radius: 100%;
    overflow: hidden;
    padding-top: 4px;
  }

  p {
    margin-bottom: 0px;
    margin-top: 6px;
    font-weight: 500;
  }
`;

const StyledMenuIcon = styled(Menu)`
  font-size: 30px;
  margin-left: 15px;
  cursor: pointer;
  color: #5b94e3;
  width: 42px;
`;

const StyledMenuArrowIcon = styled(MenuArrowOutline)`
  font-size: 30px;
  margin-left: 15px;
  cursor: pointer;
  color: #5b94e3;
  width: 38px;
`;

const StyledPopper = styled.div`
  .candidate-info {
    line-height: 100%;
    padding-top: 10px;
  }
`;

const StyledUserInfoBlock = styled.div`
  margin-right: 2rem;
  cursor: pointer;
`;

const StyledSignoutButton = styled.button`
  background: none;
  border: none;
  text-decoration: 'none';
  color: '#212529';
  &:focus {
    outline: 0px solid transparent;
  }
`;

const QuestionIcon = styled(QuestionCircle)`
  width: 20px;
  margin: 0 10px 0 0;
  color: #5f5f5f;
`;

const HR = styled.hr`
  margin: 0 !important;
`;

const ChatLink = styled.div`
  display: flex;
`;

interface TobbarProps {
  onLogout: Function;
  expert?: Expert;
}

const Topbar: React.FC<TobbarProps> = (props) => {
  const history = useHistory();
  const { menuWidthPx, setMenuWidthPx } = useMenuVisibility()!;

  const chatSupport = {
    __html:
      '<a style="text-decoration: none;color: #212529" href="javascript:void(Tawk_API.toggle())">Let us help you</a>',
  };
  const handleSignout = () => {
    props.onLogout();
    history.push('/');
  };

  const popover = (
    <Popover id="popover-basic">
      {props.expert && (
        <StyledPopper>
          <Popover.Title>
            <div className="d-flex popover-title">
              <PopoverIcon>
                {props.expert?.fullname?.charAt(0).toUpperCase()}
              </PopoverIcon>
              <div className="candidate-info">
                <p className="mb-0"> {props.expert?.fullname}</p>
                <small className="mb-0 text-secondary">
                  {' '}
                  {props.expert?.email}
                </small>
              </div>
            </div>
          </Popover.Title>
          <Popover.Content
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <QuestionIcon />
            <ChatLink dangerouslySetInnerHTML={chatSupport}></ChatLink>
          </Popover.Content>
          <HR />
          <Popover.Content>
            <div className="logout-button text-center">
              <StyledSignoutButton onClick={() => handleSignout()}>
                {'Sign out'}
              </StyledSignoutButton>
            </div>
          </Popover.Content>
        </StyledPopper>
      )}
    </Popover>
  );

  return (
    <StyledHeader {...props}>
      {!menuWidthPx ? (
        <StyledMenuIcon
          onClick={() => setMenuWidthPx && setMenuWidthPx(MenuWidth)}
        ></StyledMenuIcon>
      ) : (
        <StyledMenuArrowIcon
          onClick={() => setMenuWidthPx && setMenuWidthPx(0)}
        ></StyledMenuArrowIcon>
      )}
      <AppLogo
        logoImage={BlueInterviewHelpLogoIcon}
        imageSize="35px"
        logoText={'Expert Admin'}
        fontWeight="bold"
        textSize="20px"
        color={'#315cd5'}
      />
      <StyledUserInfoBlock>
        {props.expert && (
          <OverlayTrigger
            trigger="click"
            rootClose
            data-trigger="focus"
            placement="bottom"
            overlay={popover}
          >
            <div className="row">
              <p>{props.expert?.fullname} </p>
              <div className="profile-icon ml-2">
                {props.expert?.fullname?.charAt(0).toUpperCase()}
              </div>
            </div>
          </OverlayTrigger>
        )}
      </StyledUserInfoBlock>
    </StyledHeader>
  );
};

export default Topbar;
