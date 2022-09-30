import { PageSelectButton } from 'components/Common/PageSelectButton';
import { MainHeader, Sidebar } from 'containers';
import { OnboardingPage, OtherSettingsPage, PaymentPage, PDFPage, TrackPage } from 'pages';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { RootState } from 'store';
import styled from 'styled-components';
import { notEmpty } from 'utilities';
import { isPlacementTrack } from 'utilities/helperFunctions';
import { PrivateRoute } from 'utilities/routers/PrivateRoute';
import { SettingsDescriptionPage } from '../SettingsDescriptionPage';

const StyledDashboardPage = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    z-index: 100;
    position: fixed;
    width: 100%;
  }
  .main {
    padding-top: 20px;
    padding-left: ${(props) => (props.theme.isMaximizeContent ? '0px' : '78px')};
    margin-top: 57px;
    transition: 1s;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 80px);
  }
  .button-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: solid 2px #efefef;
  }
  .page-title {
    margin-left: 20px;
    color: #5b94e3;
    font-size: 20px;
    font-weight: bold;
  }
  .main-content {
    height: 100%;
  }
`;

export const SettingsPage: React.FC<any> = (props) => {
  const [selectedPage, selectPage] = useState('');
  const history = useHistory();
  let [isMaximizeContent, setMaximizeContent] = useState(false);
  const [pageContent, setPageContent] = useState<JSX.Element>();
  const location = useLocation();
  const { trackId, trackPlan } = useSelector((state: RootState) => state.payment);

  useEffect(() => {
    activePage();
  }, [location]);

  const activePage = () => {
    switch (location.pathname) {
      case `${props.match.path}/payments`: selectPage('PaymentPage'); break;
      case `${props.match.path}/tracks`: selectPage('TrackPage'); break;
      case `${props.match.path}/others`: selectPage('OtherSettingsPage'); break;
      case `${props.match.path}/pdf`: selectPage('PDFPage'); break;
      case `${props.match.path}/onboarding`: selectPage('OnboardingPage'); break;
    }
  }

  const handleMaximizeContent = () => {
    setMaximizeContent(!isMaximizeContent);
  };

  const showPaymentTab = (): boolean => {
    return notEmpty(trackId);
  }

  const pushHistory = (pathname: string) => {
    history.push({ pathname })
  }

  const ButtonsBar = () => (
    <div className="button-bar mx-3">
      <PageSelectButton
        selected={selectedPage === 'TrackPage'}
        onClick={() => pushHistory(`${props.match.path}/tracks`)}
        label={"Manage Tracks"}
      />
      {!isPlacementTrack() && 
        <>
          <PageSelectButton
            selected={selectedPage === 'PaymentPage'}
            disable={!showPaymentTab()}
            onClick={() => pushHistory(`${props.match.path}/payments`)}
            label={"Plan and Payments"}
          />
          <PageSelectButton
            selected={selectedPage === 'PDFPage'}
            onClick={() => pushHistory(`${props.match.path}/pdf`)}
            label={"Download as PDF"}
            disable={!showPaymentTab()} />
          <PageSelectButton
            selected={selectedPage === 'OnboardingPage'}
            onClick={() => pushHistory(`${props.match.path}/onboarding`)}
            label={"Onboarding"}
          />
          <PageSelectButton
            selected={selectedPage === 'OtherSettingsPage'}
            disable={!showPaymentTab()}
            onClick={() => pushHistory(`${props.match.path}/others`)}
            label={"Others"}
          />
        </>
      }

    </div>
  );

  return (
    <>
      <StyledDashboardPage theme={{ isMaximizeContent }}>
        <Sidebar isMaximizeContent={isMaximizeContent} />
        <div className="content">
          <div className="header">
            <MainHeader
              color="#315cd5"
              isMaximizeContent={isMaximizeContent}
              handleMaximizeContent={handleMaximizeContent}
              disable={!!props?.location?.state?.disable}
            />
          </div>
          <div className="main">
            <ButtonsBar />
            <div className="main-content">
              <PrivateRoute path={`${props.match.path}/payments`} component={PaymentPage} exact />
              <PrivateRoute path={`${props.match.path}/tracks`} component={TrackPage} exact />
              <PrivateRoute path={`${props.match.path}/others`} component={OtherSettingsPage} exact />
              <PrivateRoute path={`${props.match.path}`} component={SettingsDescriptionPage} exact />
              <PrivateRoute path={`${props.match.path}/pdf`} component={PDFPage} exact />
              <PrivateRoute path={`${props.match.path}/onboarding`} component={OnboardingPage} exact />
            </div>
          </div>
        </div>
      </StyledDashboardPage>
    </>
  );
};
