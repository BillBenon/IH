import styled from 'styled-components';
const OuterDiv = styled.div`
  position: absolute;
  width: ${(props: any) => 'calc(100% - ' + (props.menuWidthPx || 0) + 'px)'};
  height: calc(100% - 70px);
  top: 4em;
  left: ${(props: any) => (props.menuWidthPx || 0) + 'px'};
  transition: all 0.5s ease 0s;
`;

export default OuterDiv;
