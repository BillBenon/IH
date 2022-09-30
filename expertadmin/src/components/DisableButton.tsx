import styled from 'styled-components';

export const DisableButton = styled.button.attrs({
  className: 'text-center bg-white',
})`
  padding: 10px;
  border: 1px solid rgba(226, 82, 82, 0.6);
  border-radius: 4px;
  font-size: 14px;
  background: #fff;
  color: #e25252;
  height: 48px;
  outline: 0 !important;
  &:hover:enabled {
    opacity: 0.8;
    box-shadow: 0px 4px 15px #e9cbcb;
  }
  &:disabled {
    pointer-events: none;
    background-color: #e9ecef !important;
  }
`;
