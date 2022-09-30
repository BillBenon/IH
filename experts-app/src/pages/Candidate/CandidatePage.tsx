import React, { useEffect } from "react";
import { Candidate } from "../../containers/Candidate";
import { useMenuVisibility } from "../../providers/menuVisibilityProvider";
import OuterDiv from "../../components/Common/OuterDivComponent";

function CandidatePage() {
  const { isMenuVisible } = useMenuVisibility()!;

  return (
    <OuterDiv {...{ isMaximizeContent: !isMenuVisible }}>
      <div style={{ padding: "10px" }}>
        <Candidate></Candidate>
      </div>
    </OuterDiv>
  );
}

export { CandidatePage };
