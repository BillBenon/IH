import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';

import { AppButton } from '../../components/Common/AppButton';
import { AppLink } from '../../components/Common/AppLink';
import { FormHeader, FormLabel, InputField } from '../../components/Common/Controls';
import { LoginContainer } from '../../components/Common/Controls/LoginContainer';
import { LoginButton } from '../../components/Common/LoginButton';
import { PasswordField } from '../../components/Common/PasswordField';
import { TextField } from '../../components/Common/TextField';
import { SignupHeader } from '../../components/SignupHeader';
import { DEFAULT_TOKEN } from '../../utilities/constants';
import { useChangePassword } from './ChangePassword.hook';
import { IChangePassword } from './IChangePassword';

const ChangePasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  oldPassword: Yup.string()
    .required("Old password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("New password is required"),
  confirmNewPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
});

export const ChangePasswordPage = () => {
  const [{ handleChangePassword, handleLoginClick }] = useChangePassword();

  return (
    <div className="w-100 d-flex vh-100">
      <SignupHeader background="#315CD5" color="white" handleClick={handleLoginClick} />
      <LoginContainer>
        <Container className="d-flex vh-100 justify-content-center align-items-center">
          <Formik
            initialValues={{ email: "", oldPassword: "", newPassword: "", confirmNewPassword: "" }}
            validationSchema={ChangePasswordSchema}
            onSubmit={(values: any, { xxx, setErrors, setStatus, resetForm }: any) => {
              let payload: IChangePassword = {
                token: DEFAULT_TOKEN,
                email: values.email,
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
              };
              handleChangePassword(payload);
            }}
          >
            {() => (
              <Form>
                <Row className="mt-4 mb-4">
                  <Col className="font-weight-bold h3 text-center text-dark">{'Change Password'}</Col>
                </Row>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  component={TextField} />
                <Field
                  name="oldPassword"
                  component={PasswordField}
                  placeholder="Old Password"
                />
                <Field
                  name="newPassword"
                  component={PasswordField}
                  placeholder='New Password'
                />
                <Field
                  name="confirmNewPassword"
                  component={PasswordField}
                  placeholder='Confirm New Password'
                />
                <LoginButton type="submit" className="w-100 text-center text-white font-weight-bold">
                  {'Submit'}
                </LoginButton>
              </Form>
            )}
          </Formik>
        </Container>
      </LoginContainer>
    </div>
  )
}