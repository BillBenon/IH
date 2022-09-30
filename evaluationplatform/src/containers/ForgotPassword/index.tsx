import { Field, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPassword } from 'store/evaluationPlatform';
import styled from 'styled-components';
import { DEFAULT_TOKEN } from 'utilities/constants';
import * as Yup from 'yup';

import { Button, TextField } from '../../components';
import { SignupHeader } from '../SignupHeader';

const StyledButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 35px;
  button {
    border: 1px solid #5b94e3;
    font-weight: bold;
    width: 174px;
  }
`;

const CancelButton = styled(Button)`
  color: #5b94e3;
  margin-right: 17px;
`;

const FindAccountButton = styled(Button)`
  background: #5b94e3;
  color: white;
  margin-right: 17px;
`;

const StyledForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 100%;
  width: 30%;
  min-width: 538px;
  margin: auto;
  text-align: left;
  form,
  form > div {
    width: 100%;
  }
`;

const ForgotPasswordTextSection = (props: any) => (
  <div className="mb--30">
    <div className="text--bold text--30 text--black">Let's find your account</div>
  </div>
);

const ButtonSection = () => {
  return (
    <StyledButtonSection>
      <FindAccountButton type="submit">Send Email</FindAccountButton>
      <Link to="/">
        <CancelButton>Cancel</CancelButton>
      </Link>
    </StyledButtonSection>
  );
};

const _ForgotPassword: React.FC = (props: any) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <>
      <SignupHeader background="#315CD5" color="white" />

      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Required'),
        })}
        onSubmit={(values: any, { setSubmitting, setErrors, setStatus, resetForm }: any) => {
          const payload = {
            token: DEFAULT_TOKEN,
            email: values.email,
          };

          props
            .forgotPassword(payload)
            .then((res: any) => {
              if (res.payload?.apiStatus === 'SUCCESS') {
                setStatus({ success: true });
                enqueueSnackbar('Password reset link sent succssfully!', {
                  variant: 'success',
                  autoHideDuration: 2500,
                });
                props.history.push('/');
              } else {
                setStatus({ success: false });
                setErrors(res.error?.message);
                setSubmitting(false);
                enqueueSnackbar(res.error?.message, { variant: 'error', autoHideDuration: 2500 });
              }
            })
            .catch((err: any) => {
              setStatus({ success: false });
              setErrors(err.message);
              setSubmitting(false);
              enqueueSnackbar(err.message, {
                variant: 'error',
                autoHideDuration: 2500,
              });
            });
        }}
      >
        <StyledForgotPasswordContainer>
          <Form>
            <ForgotPasswordTextSection />
            <Field name="email" type="text" placeholder="Email" component={TextField} />
            <ButtonSection />
          </Form>
        </StyledForgotPasswordContainer>
      </Formik>
    </>
  );
};

const mapDispatchToProps = {
  forgotPassword,
};

export const ForgotPassword = connect(null, mapDispatchToProps)(_ForgotPassword);
