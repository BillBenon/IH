import React from "react";
import { Classes } from "../../containers/Classes";
import { useMenuVisibility } from "../../providers/menuVisibilityProvider";
import OuterDiv from "../../components/Common/OuterDivComponent";

function ClassesPage() {
  const { isMenuVisible } = useMenuVisibility()!;

  return (
    <OuterDiv {...{ isMaximizeContent: !isMenuVisible }}>
      <div style={{ padding: "10px" }}>
        <Classes></Classes>
      </div>
    </OuterDiv>
  );
}

export { ClassesPage };
