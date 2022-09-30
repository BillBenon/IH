import { useLoader } from 'context/loaderContext';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CreateHiringManager } from 'types/CreateHiringManager';
import * as Yup from 'yup';
import BrowserCacheService from '../../../services/browser-cache';
import { DEFAULT_TOKEN } from '../../../utilities/constants';
import { SignupButton } from '../../Common/LoginButton';
import { PasswordField } from '../../Common/PasswordField';
import { TextField } from '../../Common/TextField';
import styled from 'styled-components';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const LoginSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegExp, 'Phone number is not valid'),
  company: Yup.string()
    .required("Name is required"),
  password: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required"),
  verifyPassword: Yup.string()
    .min(6, "Password must be 6 characters at minimum")
    .required("Password is required")
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
});

export const CreateAccount = styled.span`
  margin-bottom: 35px;
  font-size: 30px;
`;

type IProps = {
  handleSignup: (payload: CreateHiringManager) => void;
};

export const SignupForm: React.FC<IProps> = ({ handleSignup }: IProps) => {
  const Loader = useLoader();

  useEffect(() => {
    BrowserCacheService.removeItem('auth');
  }, []);

  const handleSubmit = (values: any, { xxx, setErrors, setStatus, resetForm }: any) => {
    Loader.showLoader();
    const { fullname, email, phone, password, company } = values;
    let payload: CreateHiringManager;
    BrowserCacheService.getItem("userType", (value: any) => {
      payload = {
        fullname,
        email,
        password,
        mobile: phone,
        companyName: company,
        token: DEFAULT_TOKEN,
      };
      handleSignup(payload);
    });
  }

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <Formik
        initialValues={{ fullname: "", email: "", phone: "", password: "", verifyPassword: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Row className="mt-4 mb-4">
              <Col style={{ fontSize: '38px', marginBottom: '35px', fontWeight: 800 }} className="text-center text-dark">
                Create your account
              </Col>
            </Row>
            <Field name="fullname" type="text" placeholder="Full Name" signup component={TextField} />
            <Field name="email" type="email" placeholder="Email" signup component={TextField} />
            <Field name="phone" type="tel" placeholder="Phone" signup component={TextField} />
            <Field name="company" type="text" placeholder="Company Name" signup component={TextField} />
            <Field name="password" placeholder="Password" signup component={PasswordField} />
            <Field name="verifyPassword" placeholder="Verify Password" signup component={PasswordField} />
            <SignupButton type="submit" className="w-100 text-center text-white font-weight-bold">
              Create your account
            </SignupButton>
          </Form>
        )}
      </Formik>
    </Container >
  )
};
