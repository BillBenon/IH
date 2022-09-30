import React from 'react';
import { TextField } from '../TextField';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

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
    <p className="text--grey">Please enter your email or phone</p>
  </div>
);

const ButtonSection = () => {
  return (
    <StyledButtonSection>
      <Link to="/">
        <CancelButton>Cancel</CancelButton>
      </Link>
      <FindAccountButton type="submit">Find account</FindAccountButton>
    </StyledButtonSection>
  );
};

export const ForgotPasswordField: React.FC = () => {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={() => { }}
    >
      <StyledForgotPasswordContainer>
        <Form>
          <ForgotPasswordTextSection />
          <Field name="email" type="email" placeholder="Email or Phone" component={TextField} />
          <ButtonSection />
        </Form>
      </StyledForgotPasswordContainer>
    </Formik>
  );
};
