import React, { useEffect } from "react";
import { Meeting } from "../../containers/Meeting";
import { useMenuVisibility } from "../../providers/menuVisibilityProvider";
import OuterDiv from "../../components/Common/OuterDivComponent";

function MeetingPage() {
  const { isMenuVisible } = useMenuVisibility()!;

  return (
    <OuterDiv {...{ isMaximizeContent: !isMenuVisible }}>
      <div style={{ padding: "10px" }}>
        <Meeting></Meeting>
      </div>
    </OuterDiv>
  );
}

export { MeetingPage };
