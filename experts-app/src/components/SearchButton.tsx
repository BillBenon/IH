import styled from 'styled-components';

export const SearchButton = styled.button.attrs({
  className: 'text-center text-white',
})`
  background: #5b94e3;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border: 0;
  font-size: 14px;
  height: 35px;
  border-radius: 4px;
  padding: 5px;
  outline: 0 !important;
  &:hover:enabled {
    opacity: 0.8;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
  &:disabled {
    background-color: #5b94e3c7;
    pointer-events: none;
  }
`;
