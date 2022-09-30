import { Field, Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { resetPassword } from 'store/evaluationPlatform';
import styled from 'styled-components';
import { DEFAULT_TOKEN } from 'utilities/constants';
import * as Yup from 'yup';

import { Button, PasswordField } from '../../components';
import { SignupHeader } from '../SignupHeader';

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

const TextSection = (props: any) => (
  <div className="mb--30">
    <div className="text--bold text--30 text--black">Reset Password</div>
  </div>
);

export const _ResetPassword: React.FC = (props: any) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <>
      <SignupHeader background="#315CD5" color="white" />

      <Formik
        initialValues={{ password: '', confirmpassword: '' }}
        validationSchema={Yup.object().shape({
          password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
          confirmpassword: Yup.string()
            .required()
            .label('Verify Password')
            .test('password-match', 'Confirm Password should match with Password', function (value) {
              return this.parent.password === value;
            }),
        })}
        onSubmit={(values: any, { setSubmitting, setErrors, setStatus, resetForm }: any) => {
          let queryParams = queryString.parse(props.location.search || '') || {};
          const payload = {
            token: DEFAULT_TOKEN,
            password: values.password,
            passwordToken: queryParams.token,
          };
          props
            .resetPassword(payload)
            .then((res: any) => {
              setStatus({ success: true });
              if (res.payload?.apiStatus === 'SUCCESS') {
                enqueueSnackbar('Password has been reset succssfully', { variant: 'success', autoHideDuration: 2500 });
                props.history.push('/');
              } else {
                enqueueSnackbar(res.error?.message, { variant: 'error', autoHideDuration: 2500 });
              }
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
        <StyledForgotPasswordContainer>
          <Form>
            <TextSection />
            <Field name="password" placeholder="Password" component={PasswordField} />
            <Field name="confirmpassword" placeholder="Verify Password" component={PasswordField} />
            <Button type="submit" className="bg--purple text--white text--bold mt-3">
              {'Submit'}
            </Button>
          </Form>
        </StyledForgotPasswordContainer>
      </Formik>
    </>
  );
};

const mapDispatchToProps = {
  resetPassword,
};

export const ResetPassword = connect(null, mapDispatchToProps)(_ResetPassword);
