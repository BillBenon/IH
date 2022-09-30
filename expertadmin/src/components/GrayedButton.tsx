import styled from 'styled-components';

export const GrayedButton = styled.button.attrs({
  className: 'mr-2 mt-2 text-center',
})`
  padding: 8px 16px;
  background-color: #eeeeee;
  font-size: 14px;
  border: 0;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.56);
  &:hover {
    background-color: rgba(49, 49, 49, 0.25);
  }
`;
