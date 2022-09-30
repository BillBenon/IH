import { yupResolver } from '@hookform/resolvers/yup';
import { BlueInterviewHelpLogoIcon } from 'assets';
import { AppButton } from 'components/AppButton';
import { AppLogo } from 'components/AppLogo';
import { CenteredContainer } from 'components/CenteredContainer';
import { Error } from 'components/Error';
import { StyledFormControl } from 'components/StyledFormControl';
import { StyledLink } from 'components/StyledLink';
import React, { FC } from 'react';
import { Col, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginRequest } from 'types';
import * as Yup from 'yup';

import { useAuth } from './useAuth';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be 6 characters at minimum')
    .required('Password is required'),
});

const Auth: FC = () => {
  const [{ loading, handleLogin }] = useAuth();
  const { handleSubmit, register, errors } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <CenteredContainer>
      <Container className="d-flex vh-100 justify-content-center align-items-center">
        <Form onSubmit={handleSubmit(handleLogin)}>
          <AppLogo
            logoImage={BlueInterviewHelpLogoIcon}
            imageSize="58px"
            logoText={'Expert Admin'}
            textSize="20px"
            color="#315cd5"
          />
          <Col className="mt-4 mb-4">
            <Col className="font-weight-bold h3 text-center text-dark">
              {'Change direction to success'}
            </Col>
          </Col>
          <Col className="mb-3">
            <StyledFormControl
              ref={register}
              name="email"
              type="email"
              placeholder="Email"
            />
            {errors && errors.email && (
              <Error errorMessage={errors.email.message} />
            )}
          </Col>
          <Col className="mb-3">
            <StyledFormControl
              ref={register}
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors && errors.password && (
              <Error errorMessage={errors.password.message} />
            )}
          </Col>
          <Col>
            <AppButton disabled={loading} type="submit">
              {'Log in'}
            </AppButton>
          </Col>
          <Col className="d-flex justify-content-center mt-4">
            <StyledLink>
              <Link to="/changePassword">{'Change Password'}</Link>
            </StyledLink>
          </Col>
        </Form>
      </Container>
    </CenteredContainer>
  );
};

export default Auth;
