import React from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import styled from 'styled-components';

const StyledText = styled.div`
  margin-bottom: 10px;
`;

const StyledInput = styled.input<{signup?: boolean}>`
  padding: 10px;
  border: 1px solid #b0b0b0;
  box-sizing: border-box;
  border-radius: 5px;
  width: 22rem;
  ::placeholder {
    color: #b0b0b0;
  }

  ${({signup}) => signup && `
    width: 40rem;
    height: 3.5rem;
    margin-bottom: 12px;
  `}
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
  type?: string;
  signup?: boolean;
} & FieldProps;

export const TextField: React.FC<IProps> = (props) => {
  const { field, type, className, placeholder, signup } = props;
  return (
    <StyledText>
      <StyledInput
        id={field.name}
        type={type || 'text'}
        className={className || ''}
        placeholder={placeholder || ''}
        signup={signup}
        {...field}
      />
      <ErrorText>
        <ErrorMessage name={props.field.name || ''} />
      </ErrorText>
    </StyledText>
  );
};
