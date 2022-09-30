import React from "react";
import styled from "styled-components";
import OuterDiv from "components/Common/OuterDivComponent";
import { useMenuVisibility } from "providers/menuVisibilityProvider";
import { Header } from "../Components";
import { JobsContainer } from "./JobsContainer";

const Wrapper = styled.div`
  margin-left: 34px;
  margin-top: 40px;
`;

export const JobsPage = () => {
  const { isMenuVisible } = useMenuVisibility()!;

  return (
    <OuterDiv {...{ isMaximizeContent: !isMenuVisible }}>
      <Wrapper>
        <Header title="Jobs" />
        <JobsContainer />
      </Wrapper>
    </OuterDiv>
  );
};
