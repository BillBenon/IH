import React, { useState } from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import styled from 'styled-components';
import { StyledLinkText } from '../StyledLinkText';

const StyledPasswordInput = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const StyledPasswordInputField = styled.input<{ signup?: boolean }>`
  width: 100%;
  padding: 10px 50px 10px 10px;
  border: 1px solid #b0b0b0;
  box-sizing: border-box;
  border-radius: 5px;
  ::placeholder {
    color: #b0b0b0;
  }

  ${({ signup }) => signup && `
    height: 3.5rem;
    margin-bottom: 12px;
  `}
`;

const StyledPassword = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Suffix = styled(StyledLinkText)`
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 16px;
`;

const ErrorText = styled.div`
  text-align: left;
  color: #ff0000;
  margin-top: 5px;
`;

type IProps = {
  id?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  signup?: boolean;
} & FieldProps;

export const PasswordField: React.FC<IProps> = (props) => {
  let [showPassword, setShowPassword] = useState(false);
  const { field, className, placeholder, signup } = props;
  return (
    <StyledPassword>
      <StyledPasswordInput>
        <StyledPasswordInputField
          id={field.name}
          type={showPassword ? 'text' : 'password'}
          className={className || ''}
          placeholder={placeholder || ''}
          signup={signup}
          {...field}
        />
        <Suffix onClick={() => {
          setShowPassword(!showPassword);
        }}>
          <span>{showPassword ? 'Hide' : 'Show'}</span>
        </Suffix>
      </StyledPasswordInput>
      <ErrorText>
        <ErrorMessage name={props.field.name || ''} />
      </ErrorText>
    </StyledPassword>
  );
};
