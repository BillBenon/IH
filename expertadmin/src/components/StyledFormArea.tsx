import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

export const StyledFormArea = styled(TextareaAutosize)`
  resize: both;
  font-size: 14px;
  width: 100%;
  max-width: 100%;
  background: #f4f4f4;
  border: 0;
  color: #495057;
  padding: 0.5rem;
`;
