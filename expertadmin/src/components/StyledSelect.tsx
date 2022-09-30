import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledSelect = styled(Form.Control).attrs({ as: 'select' })`
  height: 48px;
  background: #f4f4f4;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  border: 0;
  font-size: 12px;
  padding-left: 12px;
  outline: 0 !important;
  color: #666666;
  &::placeholder {
    color: #666666;
  }
`;
