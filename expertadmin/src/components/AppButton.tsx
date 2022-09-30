import styled from 'styled-components';

export const AppButton = styled.button.attrs({
  className: 'w-100 text-center text-white font-weight-bold',
})`
  height: 55px;
  background-color: #315cd5;
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
`;
