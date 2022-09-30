import React from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import styled from 'styled-components';

export const StyledInput = styled.input`
  padding: 10px;
  font-family: Lato;
  font-size: 20px;
  border: 1px solid #b0b0b0;
  box-sizing: border-box;
  border-radius: 5px;
  height: 55px;
  width: 100%;
  ::placeholder {
    color: #b0b0b0;
  }
`;

type IProps = {
  id?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  type?: string;
} & FieldProps;

export const TextField: React.FC<IProps> = (props) => {
  return (
    <div style={{ textAlign: 'left' }}>
      <StyledInput
        id={props.field.name}
        type={props.type || 'text'}
        className={props.className || ''}
        placeholder={props.placeholder || ''}
        {...props.field}
      />
      <span className="error">
        <ErrorMessage name={props.field.name || ''} />
      </span>
    </div>
  );
};
