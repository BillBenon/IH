import styled from "styled-components";
import { Menuwidth } from "../../../utilities/constants";

const OuterDiv = styled.div`
  position: absolute;
  width: calc(100% - 100px);
  height: calc(100% - 70px);
  top: 4em;
  margin-left: ${(props: any) => (props.isMaximizeContent ? "0px" : Menuwidth + "px")};
  transition: all 0.5s ease 0s;
`;

export default OuterDiv;
