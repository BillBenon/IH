import React, { useEffect } from "react";
import { Feedback } from "../../containers/Feedback";
import { useMenuVisibility } from "../../providers/menuVisibilityProvider";
import OuterDiv from "../../components/Common/OuterDivComponent";

function FeedbackPage() {
  const { isMenuVisible } = useMenuVisibility()!;

  return (
    <OuterDiv className="outer-div" {...{ isMaximizeContent: !isMenuVisible }}>
      <div style={{ padding: "10px" }}>
        <Feedback></Feedback>
      </div>
    </OuterDiv>
  );
}

export { FeedbackPage };
