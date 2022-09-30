import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledInputDate = styled(Form.Control).attrs({ type: 'date' })`
  resize: both;
  font-size: 14px;
  height: 40px;
  width: 100%;
  background: #f4f4f4;
  border: 0;
  padding: 1rem;
`;
