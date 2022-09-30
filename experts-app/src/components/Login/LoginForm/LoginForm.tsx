import { SelectField } from 'components/Common/DropDown';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authService } from 'services/auth';
import * as Yup from 'yup';

import { BlueInterviewHelpLogoIcon } from '../../../assets';
import BrowserCacheService from '../../../services/browser-cache';
import { CandidateRequestLogin } from '../../../types/CandidateLoginRequest';
import { ExpertRequestLogin } from '../../../types/ExpertLoginRequest';
import { DEFAULT_TOKEN, EXPERT_USER_TYPE } from '../../../utilities/constants';
import { LoginButton } from '../../Common/LoginButton';
import { Logo } from '../../Common/Logo';
import { PasswordField } from '../../Common/PasswordField';
import { StyledLinkText } from '../../Common/StyledLinkText';
import { TextField } from '../../Common/TextField';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required"),
  marketId: Yup.string()
    .required("Market is required"),
});

type IProps = {
  handleLogin: Function;
};

export const LoginForm: React.FC<IProps> = (props: IProps) => {

  const [markets, setMarkets] = useState<{ marketId: string, name: string, textId: string }[]>([])

  useEffect(() => {
    if (!markets || markets.length == 0) {
      authService.getMarketsForLogin().then((res) => setMarkets(res?.output));
    }
  }, [markets])

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <Formik
        initialValues={{ email: "", password: "", marketId: "5f6e65eacaf30a0001cf1684" }}   // default market interview help
        validationSchema={LoginSchema}
        onSubmit={(values: any, { xxx, setErrors, setStatus, resetForm }: any) => {
          let payload: ExpertRequestLogin | CandidateRequestLogin;
          BrowserCacheService.getItem("userType", (value: any) => {
            if (value === EXPERT_USER_TYPE) {
              payload = {
                token: DEFAULT_TOKEN,
                email: values.email,
                marketId: values.marketId,
                password: values.password,
              };
            } else {
              payload = {
                token: DEFAULT_TOKEN,
                email: values.email,
                marketId: "5f6e65eacaf30a0001cf1684",
                socialMediaAuthenticated: false,
                password: values.password,
              };
            }
            props.handleLogin(payload);
          });
        }}
      >
        {({ handleChange, errors, values }) => (
          <Form>
            <Logo logoImage={BlueInterviewHelpLogoIcon} imageSize="58px" logoText={'Expert'} textSize="20px" color="#315cd5" />
            <Row className="mt-4 mb-4">
              <Col className="font-weight-bold h3 text-center text-dark">{'Change direction to success'}</Col>
            </Row>
            <Field name="email" type="email" placeholder="Email" component={TextField} />
            <Field name="password" placeholder="Password" component={PasswordField} />
            {markets?.length != 0 && <SelectField name='marketId' placeholder='Select Market' markets={markets} value={values.marketId}
              handleChange={(val: string) => { handleChange("marketId")(val); }} msg={errors.marketId} />}
            <LoginButton type="submit" className="w-100 text-center text-white font-weight-bold">
              {'Log in'}
            </LoginButton>
            <Row className="d-flex justify-content-center mt-4">
              <StyledLinkText>
                <Link to="/signup">{'Create your account'}</Link>
              </StyledLinkText>
            </Row>
            <Row className="d-flex justify-content-center mt-4">
              <StyledLinkText>
                <Link to="/changePassword">{'Change Password'}</Link>
              </StyledLinkText>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  )
};