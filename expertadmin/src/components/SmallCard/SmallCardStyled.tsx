import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  position: relative;
`;

export const TitleWrapper = styled.div.attrs({
  className: 'd-flex flex-column justify-content-center pl-2 pr-2',
})`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
