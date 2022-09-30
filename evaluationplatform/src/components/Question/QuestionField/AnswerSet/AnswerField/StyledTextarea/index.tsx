import styled from 'styled-components';

export const StyledTextarea = styled.textarea`
  border: none;
  height: 300px;
  min-height: 70px;
  resize: vertical;
  border-radius: 5px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.25);
  width: -webkit-fill-available;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #000000;
  padding: 19px 41px;
  &::placeholder {
    color: #949494;
    opacity: 1;
  }
  &:-ms-input-placeholder {
    color: #949494;
  }
  &::-ms-input-placeholder {
    color: #949494;
  }
  &:disabled {
    background: #f3f3f3;
  }
`;
