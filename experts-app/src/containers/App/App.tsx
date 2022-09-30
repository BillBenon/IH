import { ConnectedRouter } from 'connected-react-router';
import React, { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CandidatePage } from '../../pages/Candidate';
import { MeetingPage } from '../../pages/Meeting';
import { DashboardPage } from '../../pages/Dashboard';
import { FeedbackPage } from '../../pages/Feedback';
import { LoginPage } from '../../pages/Login';
import { SignupPage } from '../../pages/Signup';
import Profile from '../../pages/Profile';
import { SettingsPage } from '../../pages/Settings/SettingsPage';
import { VideosPage } from '../../pages/Videos';
import { MenuVisibilityProvider } from '../../providers/menuVisibilityProvider';
import BrowserCacheService from '../../services/browser-cache';
import store, { history } from '../../store';
import GlobalStyle from '../../theme/globalStyles';
import { EXPERT_USER_TYPE } from '../../utilities/constants';
import { ChangePasswordPage } from '../ChangePassword';
import { ErrorFallback } from '../ErrorFallback/ErrorFallback';
import { PrivateRoute } from '../PrivateRoute';
import { MeetingDetailPage } from '../../pages/MeetingDetail';
import { JobsPage } from '../../pages/B2B/Jobs';
import { MyDeskPage } from '../../pages/B2B/MyDesk';
import { CandidateSearchPage } from '../../pages/B2B/CandidateSearch';
import { ClassesPage } from '../../pages/Classes';

export const App = (props: any) => {
  BrowserCacheService.setItem("userType", EXPERT_USER_TYPE);

  useEffect(() => {
    toast.configure();
  }, [])

  return (
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
      >
        <GlobalStyle />
        <ConnectedRouter history={history}>
          <>
            <Switch>
              <Route path="/login" component={LoginPage} exact />
              <Route path="/signup" component={SignupPage} exact />
              <Route path="/changePassword" component={ChangePasswordPage} exact />
              <MenuVisibilityProvider>
                <PrivateRoute path="/" component={DashboardPage} exact />
                <PrivateRoute path="/dashboard" component={DashboardPage} exact />
                <PrivateRoute path="/your-candidates" component={CandidatePage} exact />
                <PrivateRoute path="/meeting" component={MeetingDetailPage} exact />
                <PrivateRoute path="/your-meetings" component={MeetingPage} exact />
                <PrivateRoute path="/submissions" component={FeedbackPage} exact />
                <PrivateRoute path="/profile" component={Profile} exact />
                <PrivateRoute path="/videos" component={VideosPage} exact />
                <PrivateRoute path="/settings" component={SettingsPage} exact />
                <PrivateRoute path="/jobs" component={JobsPage} exact />
                <PrivateRoute path="/my-desk" component={MyDeskPage} exact />
                <PrivateRoute path="/candidate-search" component={CandidateSearchPage} exact />
                <PrivateRoute path="/classes" component={ClassesPage} exact />
              </MenuVisibilityProvider>
            </Switch>
          </>
        </ConnectedRouter>
      </ErrorBoundary>
    </Provider >
  );
};
