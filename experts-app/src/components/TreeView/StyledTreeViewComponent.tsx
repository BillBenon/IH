import styled from 'styled-components';

export const TreeViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 24px;
`;

export const Font20 = styled.p`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.8);
  line-height: 18px;
  letter-spacing: 0.16px;
  margin: 0;
`;

export const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const Legend = styled.div`
  height: 20px;
  font-size: xx-small;
  color: white;
  width: 100%;
  background-color: ${(props: any) => props.theme.color};
  margin: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
