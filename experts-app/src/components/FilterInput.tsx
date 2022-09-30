import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const FilterInput = styled(Form.Control)`
  height: 48px;
  border-radius: 2px;
  font-size: 14px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border: 0;
  width: 100%;
  padding: 10px 16px;
  outline: 0 !important;
  &::placeholder {
    color: #8f8f8f;
  }
`;
