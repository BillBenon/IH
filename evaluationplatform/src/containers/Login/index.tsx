import { useStripePayment } from 'components/Common/customHooks/stipePayment';
import { handleLandingPageSignupSuccess } from 'containers/Signup/landingPageSignup';
import { useLoader } from 'context/loaderDots';
import { Field, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { LinkedIn } from "react-linkedin-login-oauth2";
import { connect, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getLocalStorageValue, getValueBrowserStorage, setValueBrowserStorage } from 'services/browserStorageService';
import {
  getDetailsForCandidateByCandidateAndTrackId,
  createCandidateTrackForCandidate,
  getDetailsForCandidatebyCandidateTrackId, getLinkedInAccessToken, getTracksForCandidate, login, landingPageLogin as lpLogin
} from 'store/evaluationPlatform';
import { setTrackInfoForPayment } from 'store/payment';
import styled from 'styled-components';
import { Candidate_Track_Id, Company_Partner, DEFAULT_TOKEN, Expert_Login, isProd, FLOW_TYPE } from 'utilities/constants';
import { FormHeading, isOpenedFromLandingPages, loginButtonLabel, setStorageFromLangingPageParams, showPartnerName } from 'utilities/landingPageUtil';
import * as Yup from 'yup';
import { BlueInterviewHelpLogoIcon } from '../../assets';
import Icon from '../../assets/icons/common/linkedIn.svg';
import {
  Button, Logo,
  MarketSelectDropdown, PasswordField,
  StyledLinkText, TextField
} from '../../components';
import { getValidMarket } from '../../utilities';
import { handleLandingPageLoginSuccess } from './landingPageLogin';
import './linkedin.css';
import { useTalkToExperts } from "../TalkToExpert/useTalkToExpert";
import { evaluationPlatformService } from 'services';

const LoginContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  min-width: 538px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .form {
    width: 100%;
  }
  .form > div,
  .form > button {
    margin-bottom: 10px;
  }

  #login-divider {
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .divider .divider__line {
    border-bottom: 1px solid #b0b0b0;
    width: 45%;
  }

  .divider .divider__text {
    margin-left: 10px;
    margin-right: 10px;
  }

  .linkedin .icon {
    background: #0274b3;
  }

  .login__footer span {
    color: #0f0f0f;
    font-size: 18px;
  }

  .partner-name {
    position: relative;
    bottom: 15px;
    color: red;
    text-transform: uppercase;
  }
`;

const WelcomeSection = () => (
  <div className="mt--30 mb--30">
    <div className="text--bold text--30 text--center text--black">
      {isOpenedFromLandingPages() ? FormHeading(true) : 'Grow into top tier organizations.'}
    </div>
  </div>
);

// const Divider = () => (
//   <div id="login-divider" className="flexrow text--grey divider">
//     <div className="divider__line" />
//     <div className="divider__text">or</div>
//     <div className="divider__line" />
//   </div>
// );

const LoginForm = ({
  marketList,
  handleChange,
  marketId,
}: {
  marketList: Array<any>;
  handleChange: any;
  marketId: string;
}) => {
  return (
    <div className="col w--30 form">
      <Field name="email" type="email" placeholder="Email" component={TextField} />
      <Field name="password" placeholder="Password" component={PasswordField} />
      {!isProd() && marketList && !isOpenedFromLandingPages() && (
        <MarketSelectDropdown marketList={marketList} handleChange={handleChange} value={marketId} />
      )}
      <Button type="submit" className="bg--purple text--white mt-3 text--bold">
        {isOpenedFromLandingPages() ? loginButtonLabel() : 'Log in'}
      </Button>

      {/* <Divider />
  
        <SocialButton icon={LinkedInIcon} color="white" background1="rgba(2, 116, 179, 0.81)" background2="#0274B3">
          Log in with LinkedIn
        </SocialButton>
        <SocialButton icon={GitHubIcon} color="white" background1="rgba(24, 22, 22, 0.71)" background2="#181616">
          Log in with GitHub
        </SocialButton>
        <SocialButton icon={GoogleIcon} color="#B0B0B0" divide="1px solid #B0B0B0" imageSize="25px">
          Log in with Google
        </SocialButton> */}
    </div>
  );
};

const LoginFooter = () => {
  const location = useLocation();
  return (
    <div>
      <div className="mt--30 mb--20">
        <StyledLinkText>
          <Link to="/forgot-password">Forgot password?</Link>
        </StyledLinkText>
      </div>
      <div className="login__footer">
        <span className="mr--10">
          {isOpenedFromLandingPages() ? 'New to us?' : 'New to InterviewHelp?'}
        </span>
        <StyledLinkText>
          <Link to={{
            pathname: "/signup",
            search: location.search
          }}>
            {isOpenedFromLandingPages() ? 'Register Here' : 'Create an account'}
          </Link>
        </StyledLinkText>
      </div>
    </div>
  );
};

const PartnerName = () => {
  const company = getValueBrowserStorage(Company_Partner);
  return (
    <span>
      {showPartnerName() && (
        <span className='partner-name'>{company}</span>
      )}
    </span>
  )
};

const _Login = (props: any) => {
  const loader = useLoader();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const { search } = useLocation();
  const _queryParams: any = queryString.parse(search);

  const { continueCheckout } = useTalkToExperts();

  const [marketList, setMarketList] = useState<Array<any>>([]);
  useEffect(() => {
    loader.showLoader();
    evaluationPlatformService.getMarkets().then((res) => {
      setMarketList(res.output);
      loader.hideLoader();
    }).catch(() => loader.hideLoader())
  }, []);

  useEffect(() => {
    if (typeof _queryParams.candidateId != "undefined") {
      directLogin();
    }
    if (typeof _queryParams.lpemail != "undefined" && typeof _queryParams.lptrackid != "undefined") {
      landingPageLogin(_queryParams.lptrackid, _queryParams.lpemail, _queryParams.referral);
    }
  }, [])

  setStorageFromLangingPageParams(_queryParams);

  const handleFailure = (error: any) => {
    console.log(error);
  }

  const landingPageLogin = (trackId: string, email: string, referralURL: string) => {
    const root = document.getElementsByClassName("App");
    if (root && root[0]) root[0].classList.add("d-none");
    const token = "123";
    const loginResponse: any = dispatch(lpLogin({ token, email, trackId, referralURL }));
    loginResponse.then((res: any) => {
      if (root && root[0]) root[0].classList.remove("d-none");
      if (res.payload?.output?.emailExists) {
        enqueueSnackbar('Email already exists, kindly login to continue', { variant: 'error', autoHideDuration: 4000 });
        return;
      } else {
        let candidateTrackId = res.payload.output.lastCandidateSavedSetting.lastCandidateTrackIDWorkedOn;
        setValueBrowserStorage('candidateId', res.payload?.output?.candidateId);
        setValueBrowserStorage(Candidate_Track_Id, candidateTrackId);
        setValueBrowserStorage('authorizationToken', res.payload?.output?.authorizationToken);
        props.history.push({
          pathname: '/question',
          search
        });
      }
    });
  }

  const directLogin = () => {
    setValueBrowserStorage('candidateId', _queryParams.candidateId);
    setValueBrowserStorage(Candidate_Track_Id, _queryParams.trackid);
    setValueBrowserStorage(Expert_Login, '1');
    setValueBrowserStorage('authorizationToken', _queryParams.authorizationToken);
    loader.showLoader();
    setTimeout(() => {
      props.history.push({
        pathname: '/question',
        search
      });
    }, 1000)
  }

  const handleLinkedInSuccess = (data: any) => {
    const token = "123";
    const grant_type = "authorization_code";
    const state = getLocalStorageValue("linkedin_oauth2_state") || "";
    const client_id = process.env.REACT_APP_CLIENT_ID || "";
    const code = data.code || "";
    const client_secret = process.env.REACT_APP_LINKEDIN_SECRET || "";
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI || "";
    const marketId = "5f6e65eacaf30a0001cf1684";
    const loginResponse: any = dispatch(getLinkedInAccessToken({ grant_type, state, client_id, code, client_secret, redirect_uri, token, marketId }));
    loginResponse.then((res: any) => {
      if (res.payload?.output.lastCandidateSavedSetting) {
        onLoginSuccess(res);
      } else {
        onSignupSuccess(res);
      }
    });
  }

  const onLoginSuccess = (res: any) => {
    if (res.payload?.apiStatus === 'SUCCESS') {
      enqueueSnackbar('Login Successful!', { variant: 'success', autoHideDuration: 2500 });
      setValueBrowserStorage('candidateId', res.payload.output.candidateId);
      setValueBrowserStorage('authorizationToken', res.payload.output.authorizationToken);
      if (!!res.payload.output.lastCandidateSavedSetting.lastCandidateTrackWorkedOn || _queryParams.lptrackid) {
        setValueBrowserStorage(Candidate_Track_Id, res.payload.output.lastCandidateSavedSetting.lastCandidateTrackIDWorkedOn);
        if (_queryParams.lptrackid) {
          if (_queryParams?.lpflowtype === FLOW_TYPE.mockInterview) {
            props.setTrackInfoForPayment({
              trackId: res.payload.output.lastCandidateSavedSetting.trackId,
              trackPlan: res.payload.output.lastCandidateSavedSetting.displayPlanName,
              trackName: res.payload.output.lastCandidateSavedSetting.lastCandidateTrackWorkedOn,
              planState: res.payload.output.lastCandidateSavedSetting.planState
            });
            props.history && props.history.push({
              pathname: '/meetings',
              search
            })
            return;
          }
          handleLandingPageLoginSuccess({ props, loader, search, startCheckout, enqueueSnackbar, continueCheckout });
        } else if (_queryParams.meetingDetailId) {
          props.setTrackInfoForPayment({
            trackId: res.payload.output.lastCandidateSavedSetting.trackId,
            trackPlan: res.payload.output.lastCandidateSavedSetting.displayPlanName,
            trackName: res.payload.output.lastCandidateSavedSetting.lastCandidateTrackWorkedOn,
            planState: res.payload.output.lastCandidateSavedSetting.planState
          });
          props.history && props.history.push({
            pathname: '/meetings',
            search
          })
          return;
        } else {
          // update payment store info for track and plan
          props.setTrackInfoForPayment({
            trackId: res.payload.output.lastCandidateSavedSetting.trackId,
            trackPlan: res.payload.output.lastCandidateSavedSetting.displayPlanName,
            trackName: res.payload.output.lastCandidateSavedSetting.lastCandidateTrackWorkedOn,
            planState: res.payload.output.lastCandidateSavedSetting.planState
          });

          props.history.push({
            pathname: '/question',
            search
          });
        }
      } else {
        props.history.push({
          pathname: '/settings/tracks',
          state: { disable: true },
        });
      }
    } else {
      enqueueSnackbar(res.error?.message, { variant: 'error', autoHideDuration: 2500 });
    }
  }

  const onSignupSuccess = (res: any) => {
    if (res.payload?.apiStatus === 'SUCCESS') {
      enqueueSnackbar('Successfully created!', { variant: 'success', autoHideDuration: 2500 });
      setValueBrowserStorage('candidateId', res.payload.output.candidateId);
      setValueBrowserStorage('authorizationToken', res.payload.output.authorizationToken);
      if (_queryParams.lptrackid) {
        handleLandingPageSignupSuccess({ props, loader, startCheckout, enqueueSnackbar, continueCheckout });
      } else {
        props.history.push({
          pathname: '/settings/tracks',
          state: { disable: true },
        });
      }
    } else {
      enqueueSnackbar(res.error?.message, { variant: 'error', autoHideDuration: 2500 });
    }
  }

  const market = getValidMarket(props.market, { name: 'InterviewHelp', logo: BlueInterviewHelpLogoIcon, theme: '' });
  const { startCheckout } = useStripePayment();
  return (
    <Formik
      initialValues={{ email: _queryParams.lpemail ?? "", password: '', marketId: '5f6e65eacaf30a0001cf1684' }}   // default market interviewhelp
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
        marketId: Yup.string().required('Market is required'),
      })}
      onSubmit={(values: any, { setSubmitting, setErrors, setStatus, resetForm }: any) => {
        const payload = {
          token: DEFAULT_TOKEN,
          email: values.email,
          marketId: values.marketId,
          socialMediaAuthenticated: false,
          password: values.password,
        };

        props
          .login(payload)
          .then((res: any) => {
            setStatus({ success: true });
            onLoginSuccess(res);
          })
          .catch((err: any) => {
            setStatus({ success: false });
            setErrors(err.message);
            setSubmitting(false);
            enqueueSnackbar(err?.message, {
              variant: 'error',
              autoHideDuration: 2500,
            });
          });
      }}
    >
      {({ values, handleChange }) => (
        <LoginContainer>
          <Form>
            {market?.name && <Logo logoImage={market?.logo} imageSize="58px" logoText={market?.name} textSize="20px" color="#315cd5" href={'https://www.interviewhelp.io/'} />}
            <PartnerName />
            <WelcomeSection />
            <LoginForm marketList={marketList} handleChange={handleChange} marketId={values.marketId} />
            <LoginFooter />
          </Form>
          <LinkedIn
            clientId={process.env.REACT_APP_CLIENT_ID}
            onFailure={handleFailure}
            onSuccess={handleLinkedInSuccess}
            scope={"r_emailaddress r_liteprofile"}
            redirectUri={process.env.REACT_APP_REDIRECT_URI}
          >
            <button
              id="signin-linkedin-button"
              className="mt-3"
            >
              <div className="button-logo">
                <img className="" src={Icon} alt="LinkedIn Icon." />
              </div>
              <div className="button-text">
                {'Sign In With LinkedIn'}
              </div>
            </button>
          </LinkedIn>
          {/* {!code && <div>No code</div>}
          {code && <div>Code: {code}</div>}
          {errorMessage && <div>{errorMessage}</div>} */}
        </LoginContainer>
      )}
    </Formik>
  );
};

const mapStateToProps = (state: any) => ({
  market: state.evaluationPlatform?.market,
});

const mapDispatchToProps = {
  login,
  getDetailsForCandidateByCandidateAndTrackId,
  getDetailsForCandidatebyCandidateTrackId,
  setTrackInfoForPayment,
  createCandidateTrackForCandidate,
  getTracksForCandidate
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
