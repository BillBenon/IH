import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledRadio = styled(Form.Check).attrs({
  inline: true,
})`
  height: 40px;
  color: rgba(0, 0, 0, 0.48);
  font-size: 14px;
  line-height: 120%;
  input[type='radio'],
  input[type='checkbox'] {
    zoom: 1.5;
    margin-right: 10px;
  }
`;
