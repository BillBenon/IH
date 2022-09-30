import styled from 'styled-components';

export const AddButton = styled.button.attrs({
  className: 'pl-3 pr-3 text-center bg-white',
})`
  padding: 10px;
  color: #5b94e3;
  font-size: 14px;
  border: 1px solid #5b94e3;
  border-radius: 4px;
  height: 48px;
  &:hover:enabled {
    opacity: 0.8;
    box-shadow: 0px 4px 15px rgba(49, 49, 49, 0.25);
  }
  &:disabled {
    pointer-events: none;
    background-color: #e9ecef !important;
  }
`;
