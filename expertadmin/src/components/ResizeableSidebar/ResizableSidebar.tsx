import './ResizableSidebarStyle.css';

import React, { ReactNode, useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';

export type ResizableSidebarProps = {
  firstChild: ReactNode;
  secondChild: ReactNode;
  collapse?: boolean;
};
export default function ResizableSidebar({
  collapse,
  firstChild,
  secondChild,
}: ResizableSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>();

  useEffect(() => {
    setIsCollapsed(collapse);
  }, [collapse]);

  const myFunction = (event: any) => {
    localStorage.setItem('treeScrollTop', event.target.scrollTop);
  }

  useEffect(() => {
    const target = document.querySelector('.Pane');
    if (target) {
      target.addEventListener('scroll', myFunction);
    }
    return function cleanup() {
      target?.removeEventListener('scroll', myFunction);
    }
  }, [])

  return (
    <SplitPane
      style={{ overflowY: 'auto' }}
      split="vertical"
      size={isCollapsed ? 0 : undefined}
      minSize={0}
      maxSize={450}
      defaultSize={250}
    >
      <div style={{ color: 'rgba(0, 0, 0, 0.08)' }}>{firstChild}</div>
      <div className="h-100"> {secondChild}</div>
    </SplitPane>
  );
}
