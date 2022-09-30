import React from 'react';
import { TextField, Button } from '../..';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PasswordField } from '../PasswordField';

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

export const ResetPasswordField: React.FC = () => {
    return (
        <Formik
            initialValues={{ password: '', confirmpassword: '' }}
            validationSchema={Yup.object().shape({
                password: Yup.string().required().min(2, "Too Short"),
                confirmpassword: Yup.string().required().label('Confirm Password').test('password-match', 'Confirm Password should match with Password', function (value) {
                    return this.parent.password === value;
                })
            })}
            onSubmit={() => { }}
        >
            <StyledForgotPasswordContainer>
                <Form>
                    <TextSection />
                    <Field name="password" placeholder="Password" component={PasswordField} />
                    <Field name="confirmpassword" placeholder="Confirm Password" component={PasswordField} />
                    <Button type="submit" className="bg--purple text--white text--bold mt-3">
                        {"Submit"}
                    </Button>
                </Form>
            </StyledForgotPasswordContainer>
        </Formik>
    );
};
