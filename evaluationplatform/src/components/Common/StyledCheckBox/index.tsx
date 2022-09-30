import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledCheckBox = styled(Form.Check)`
  height: 40px;
  color: rgba(0, 0, 0, 0.48);
  font-size: 14px;
  line-height: 120%;
  input[type='radio'],
  input[type='checkbox'] {
    margin-bottom: 0px;
  }
`;
