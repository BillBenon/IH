import './TreeViewComponentStyle.css';
import 'rc-tree/assets/index.css';

import { CaretDownFill, CaretUpFill } from '@styled-icons/bootstrap';
import { StyledIcon } from '@styled-icons/styled-icon';
import Tree, { TreeNode } from 'rc-tree';
import { NodeDragEventParams } from 'rc-tree/lib/contextTypes';
import { EventDataNode } from 'rc-tree/lib/interface';
import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import {
  Legend,
  LegendWrapper,
  TreeViewWrapper,
} from './StyledTreeViewComponent';

export type LagendProps = {
  color: string;
  text: string;
};

interface TreeViewComponentProps {
  data: TreeViewProp[];
  onRootClick?: Function;
  selectedNode?: string;
  legend?: LagendProps[];
  rootNode?: Element;
  expandedKeys?: string[];
  handleExpandedKeys?: Function;
  draggable?: boolean;
  disabled?: boolean;
  checkable?: boolean;
  onCheck?: any;
  onDrop?: (
    info: NodeDragEventParams<HTMLDivElement> & {
      dragNode: EventDataNode;
      dragNodesKeys: (string | number)[];
      dropPosition: number;
      dropToGap: boolean;
    }
  ) => void;
}

const switcherIcon = (obj: { isLeaf: boolean; expanded: boolean }) => {
  if (obj.isLeaf) return '';
  if (obj.expanded) return <CaretDownFill size={12} />;
  return <CaretUpFill size={12} />;
};

export type TreeViewProp = {
  children: TreeViewProp[];
  key: string;
  title: string;
  color: string;
  onClick?: Function;
  actionItems: ActionItem[];
};

export type ActionItem = {
  icon: StyledIcon;
  onClick: Function;
  color: string;
  tooltip: string;
};

export default function TreeViewComponent(props: TreeViewComponentProps) {
  const [dragEntity, setDragEntity] = useState<string>();

  const onExpand = (data: any, node: any) => {
    if (node.expanded) {
      const inx = data.findIndex((d: string) => d === node.node.key);
      if (inx === -1) {
        data.push(node.node.key);
      }
    } else {
      const inx = data.findIndex((d: string) => d === node.node.key);
      if (inx != -1) {
        data.splice(inx, 1, data);
      }
    }
    props.handleExpandedKeys && props.handleExpandedKeys(data);
  };

  const loop = (data: any) =>
    data.map((item: TreeViewProp) => {
      if (item?.children && item.children.length) {
        return (
          <>
            <TreeNode key={item.key} title={item.title}>
              {loop(item.children)}
            </TreeNode>
          </>
        );
      }
      return item ? <TreeNode key={item.key} title={item.title} /> : '';
    });

  const allowDrop = ({ dropNode }: any) => {
    const nodeKeyArr = dropNode.key.split('-');
    nodeKeyArr.splice(-2, 2);
    return nodeKeyArr.join() === dragEntity;
  };

  const onDragStart = ({ node }: any) => {
    const nodeKeyArr = node.key.split('-');
    nodeKeyArr.splice(-2, 2);
    setDragEntity(nodeKeyArr.join());
  };

  return (
    <TreeViewWrapper
      style={{ pointerEvents: props.disabled ? 'none' : 'all' }}
      className="pt-3 pl-3"
    >
      <LegendWrapper className="mb-3">
        {props.legend?.map((l: LagendProps, index: number) => {
          return (
            <OverlayTrigger
              key={index}
              placement="top"
              overlay={<Tooltip id={'legend'}>{l.text}</Tooltip>}
            >
              <Legend theme={{ color: l.color }}>{l.text}</Legend>
            </OverlayTrigger>
          );
        })}
      </LegendWrapper>
      {props.rootNode}
      {!!props.data?.length && (
        <Tree
          allowDrop={allowDrop}
          onDragStart={onDragStart}
          draggable={props.draggable}
          showLine={true}
          onExpand={onExpand}
          defaultExpandAll={true}
          switcherIcon={switcherIcon}
          onDrop={props.onDrop}
          onCheck={props.onCheck}
          checkable={props.checkable}
        >
          {loop(props.data)}
        </Tree>
      )}
    </TreeViewWrapper>
  );
}
