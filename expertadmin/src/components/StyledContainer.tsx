import styled from 'styled-components';

export const StyledContainer = styled.div`
  font-size: 15px;
  position: relative;
  line-height: 24px;
  white-space: pre-wrap;
  color: #161616;
  padding-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: ${(props: any) => props.theme.lineClamp || 'none'};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
