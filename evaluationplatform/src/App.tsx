import { CareerConsultancy } from 'pages/CareerConsultancy';
import { HiringEcosystem } from 'pages/HiringEcosystem';
import { Classes } from 'pages/Classes';
import React, { lazy, Suspense, useEffect } from 'react';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { getMarketInfoAction, getMarketListAction } from 'store/evaluationPlatform';
import { DEFAULT_MARKET_NAME, DEFAULT_TOKEN } from 'utilities/constants';
import { PrivateRoute } from 'utilities/routers/PrivateRoute';
import { PublicRoute } from 'utilities/routers/PublicRoute';
import './App.css';
import {
  DashboardPage, ForgotPasswordPage, LoginPage, NotFoundPage, ResetPasswordPage, SettingsPage, SignupPage, TrackPage, UserProfile
} from './pages';

const App = (props: any) => {
  useEffect(() => {
    props.getMarketInfoAction({ token: DEFAULT_TOKEN, market: DEFAULT_MARKET_NAME });
    props.getMarketListAction({ types: ['Market'] });
    // eslint-disable-next-line
  }, []);

  const CommunityPage = lazy(() => import('pages/CommunityPage'));
  const TalkToExpertPage = lazy(() => import('pages/TalkToExpert'));
  const ResumeReviewPage = lazy(() => import('pages/ResumeReview'));
  const QuestionPage = lazy(() => import('pages/QuestionPage'));
  return (
    <div className="App">
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact />
          <PublicRoute path="/login" component={LoginPage} exact />
          <PublicRoute path="/signup" component={SignupPage} exact />
          <PublicRoute path="/forgot-password" component={ForgotPasswordPage} exact />
          <PublicRoute path="/resetPassword" component={ResetPasswordPage} exact />
          <PublicRoute path="/linkedInAuthenticate" component={LinkedInPopUp} exact />
          <PrivateRoute path="/meetings" component={TalkToExpertPage} exact />
          <PrivateRoute path="/consultancy" component={CareerConsultancy} exact />
          <PrivateRoute path="/settings" component={SettingsPage} />
          <PrivateRoute path="/dashboard" component={DashboardPage} exact />
          <PrivateRoute path="/question" component={QuestionPage} exact />
          <PrivateRoute path="/tracks" component={TrackPage} exact />
          <PrivateRoute path="/community" component={CommunityPage} exact />
          <PrivateRoute path="/resume-review" component={ResumeReviewPage} exact />
          <PrivateRoute path="/hiring-ecosystem" component={HiringEcosystem} exact />
          <PrivateRoute path="/classes" component={Classes} exact />
          <PrivateRoute path="/profile" component={UserProfile} exact />
          <PublicRoute component={NotFoundPage} />
        </Switch>
      </Suspense>
    </div>
  );
};

const mapDispatchToProps = {
  getMarketInfoAction,
  getMarketListAction,
};

export default connect(null, mapDispatchToProps)(App);
