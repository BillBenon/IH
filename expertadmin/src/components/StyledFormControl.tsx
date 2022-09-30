import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledFormControl = styled(Form.Control).attrs({
  className: 'h-auto',
})`
  padding: 10px;
`;
