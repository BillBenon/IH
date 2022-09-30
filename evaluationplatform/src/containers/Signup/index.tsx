import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import {
  Button,
  TextField,
  PasswordField,
  MarketSelectDropdown,
  StyledLinkText,
  Logo
} from 'components';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { createCandidateTrackForCandidate, createNewCandidateForMarketAction } from 'store/evaluationPlatform';
import styled from 'styled-components';
import { Company_Partner, DEFAULT_TOKEN, Flowtype, isProd, Product_Id, Track_Id } from 'utilities/constants';
import { useLocation } from 'react-router';
import queryString from 'query-string'
import { useLoader } from 'context/loaderDots';
import { handleLandingPageSignupSuccess } from './landingPageSignup';
import { useStripePayment } from 'components/Common/customHooks/stipePayment';
import { getValidMarket } from 'utilities';
import { BlueInterviewHelpLogoIcon } from 'assets';
import { getValueBrowserStorage, setValueBrowserStorage } from 'services/browserStorageService';
import { FormHeading, isOpenedFromLandingPages, setStorageFromLangingPageParams, showPartnerName, signupButtonLabel } from 'utilities/landingPageUtil';
import { useTalkToExperts } from "../TalkToExpert/useTalkToExpert";
import { evaluationPlatformService } from 'services';

const SignupContainer = styled.div`
  form > div,
  form > button {
    width: 100%;
    margin-bottom: 18px;
  }
  form {
    width: 100%;
  }
  h1 {
    margin-bottom: 35px;
    font-size: 30px;
    font-weight: bold;
  }
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  min-width: 538px;
  margin: auto;

  .partner-name {
    position: relative;
    bottom: 15px;
    color: red;
    text-transform: uppercase;
  }
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

interface IValues {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  marketId: string;
}

const _Signup = (props: any) => {
  const loader = useLoader();
  const { enqueueSnackbar } = useSnackbar();
  const { search } = useLocation();
  const _queryParams: any = queryString.parse(search);
  const location = useLocation();
  const initialBtnTxt = `Create your account`;
  const [btnTxt, updateBtnTxt] = useState<string>(initialBtnTxt);
  const [disabled, toggleDisabled] = useState<boolean>(false);
  const [marketList, setMarketList] = useState<Array<any>>([]);
  const { startCheckout } = useStripePayment();
  const { continueCheckout } = useTalkToExperts();
  const market = getValidMarket(props.market, { name: 'InterviewHelp', logo: BlueInterviewHelpLogoIcon, theme: '' });

  useEffect(() => {
    setStorageFromLangingPageParams(_queryParams);
  }, []);

  useEffect(() => {
    loader.showLoader();
    evaluationPlatformService.getMarkets().then((res) => {
      setMarketList(res.output);
      loader.hideLoader();
    }).catch(() => loader.hideLoader())
  }, []);
  //
  const handleSignup = (values: IValues, { setSubmitting, setErrors, setStatus, resetForm }: any) => {
    const payload = {
      token: '123',
      marketId: values.marketId,
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      referralURL: search.slice(1)
    };
    // updateBtnTxt('Creating Account.');
    // toggleDisabled(true);
    props.createNewCandidateForMarketAction(payload)
      .then(async (res: any) => {
        setStatus({ success: true });
        if (res.payload?.apiStatus === 'SUCCESS') {
          enqueueSnackbar('Successfully created!', { variant: 'success', autoHideDuration: 2500 });
          setValueBrowserStorage('candidateId', res.payload.output.candidateId);
          setValueBrowserStorage('authorizationToken', res.payload.output.authorizationToken);
          if (_queryParams.lptrackid) {
            updateBtnTxt('Enroling in track.');
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
      }).catch((err: any) => {
        setStatus({ success: false });
        setErrors(err.message);
        setSubmitting(false);
        enqueueSnackbar(err?.message, {
          variant: 'error',
          autoHideDuration: 2500,
        });
        toggleDisabled(false)
        updateBtnTxt('Create your account')
      });
  };

  return (
    <Formik
      initialValues={{ fullname: '', email: '', password: '', confirmPassword: '', marketId: '5f6e65eacaf30a0001cf1684' }}  // default market interviewhelp
      validationSchema={Yup.object({
        fullname: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        marketId: Yup.string().required('Required'),
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
        confirmPassword: Yup.string()
          .required('Required')
          .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value;
          }),
      })}
      onSubmit={(values, { setSubmitting, setErrors, setStatus, resetForm }) => {
        handleSignup(values, { setSubmitting, setErrors, setStatus, resetForm });
      }}
    >
      {({ values, handleChange, errors }) => (
        <SignupContainer>
          <Form>
            {isOpenedFromLandingPages() ? (
              <div className='mt--10'>
                <Logo logoImage={market.logo} imageSize="58px" logoText={market.name} textSize="20px" color="#315cd5" href={'https://www.interviewhelp.io/'} />
                <PartnerName />
                <h1 className="text--30">
                  {FormHeading(false)}
                </h1>
              </div>
            ) : (
              <h1 className="text--left text--30">
                Create your account
              </h1>
            )}

            <Field name="fullname" type="text" placeholder="Full Name" component={TextField} />
            <Field name="email" type="email" placeholder="Email or Phone" component={TextField} />
            <Field name="password" placeholder="Password" component={PasswordField} />
            <Field name="confirmPassword" placeholder="Verify Password" component={PasswordField} />
            {!isProd() && marketList && !isOpenedFromLandingPages() && (
              <MarketSelectDropdown marketList={marketList} handleChange={handleChange} value={values.marketId} />
            )}
            <Button disabled={disabled} type="submit" className="bg--purple text--bold text--white mt--30">
              {isOpenedFromLandingPages() ? signupButtonLabel() : btnTxt}
            </Button>
            {isOpenedFromLandingPages() && (
              <div>
                <span className="mr--10">
                  Already have an account
                </span>
                <StyledLinkText>
                  <Link to={{
                    pathname: "/",
                    search: location.search
                  }}>
                    Sign In here
                  </Link>
                </StyledLinkText>
              </div>
            )}
          </Form>
        </SignupContainer>
      )}
    </Formik>
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

const mapDispatchToProps = {
  createNewCandidateForMarketAction,
  createCandidateTrackForCandidate
};

const mapStateToProps = (state: any) => ({
  market: state.evaluationPlatform.market,
  marketList: state.evaluationPlatform.marketList,
});

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup);
