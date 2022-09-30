import styled from 'styled-components';

export const ChipButton = styled.span`
  border: 0 !important;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis !important;
  margin-right: 5px;
  width: auto;
  max-width: ${(props: any) => (props.theme.clamp ? '100px' : '100%')};
  height: 16px;
  line-height: 0px;
  padding: 12px;
  letter-spacing: 0.32px;
  font-size: 12px;
  display: inline-block;
  border-radius: 1.42rem;
  color: ${(props: any) => `${props.theme.color}` || '#FFF4DE'};
  background-color: ${(props: any) =>
    `${props.theme.backgroundcolor}` || '#FFF4DE'};
  &:hover {
    background-color: rgb(91, 148, 227);
    color: #fff;
  }
`;
