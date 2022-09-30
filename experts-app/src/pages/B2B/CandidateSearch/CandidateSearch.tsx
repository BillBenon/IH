import React from "react";
import OuterDiv from "components/Common/OuterDivComponent";
import { useMenuVisibility } from "providers/menuVisibilityProvider";
import { InProgressWrapper } from '../../ExpertView/ExpertView';
import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard";

export const CandidateSearchPage = () => {
  const { isMenuVisible } = useMenuVisibility()!;

  return (
    <OuterDiv {...{ isMaximizeContent: !isMenuVisible }}>
      <InProgressWrapper>
        <Dashboard style={{ height: '100px' }} />
        {"Coming soon..."}
      </InProgressWrapper>
    </OuterDiv>
  );
};
