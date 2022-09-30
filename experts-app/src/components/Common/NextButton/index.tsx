import styled from 'styled-components';

export const NextButton = styled.div`
  position: absolute;
  top: calc(50% - 34px);
  right: 0px;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
`;
