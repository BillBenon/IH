import { CaretDownFill, CaretUpFill } from '@styled-icons/bootstrap';
import { StyledIcon } from '@styled-icons/styled-icon';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';
import { NodeDragEventParams } from 'rc-tree/lib/contextTypes';
import { EventDataNode } from 'rc-tree/lib/interface';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { debounce } from 'lodash';
import {
  Legend,
  LegendWrapper,
  TreeViewWrapper
} from './StyledTreeViewComponent';
import './TreeViewComponentStyle.css';



export type LagendProps = {
  color: string;
  text: string;
};

interface TreeViewComponentProps {
  data: TreeViewProp[];
  defaultQuestions?: string[];
  onRootClick?: Function;
  selectedNode?: string;
  legend?: LagendProps[];
  expandedKeys?: string[];
  handleExpandedKeys?: Function;
  draggable?: boolean;
  disabled?: boolean;
  checkable?: boolean;
  checkedKeys?: string[];
  onCheck?: any;
  showFilter?: boolean;
  headerClassname?: string;
  bodyClassname?: string;
  filterPlaceholder?: string;
  onFilterChange?: (filterval?: string, showCheckedOnly?: boolean) => void;
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
  title: React.ReactElement;
  color: string;
  onClick?: Function;
  disableCheckbox?: boolean;
  actionItems: ActionItem[];
  checked?: boolean;
};

export type ActionItem = {
  icon: StyledIcon;
  onClick: Function;
  color: string;
  tooltip: string;
};

export default function TreeViewComponent(props: TreeViewComponentProps) {
  const [dragEntity, setDragEntity] = useState<string>();
  const [filterVal, setFilterVal] = useState<string>("");
  const [showSelectedQuestions, setShowSelectedQuestions] = useState<boolean>(true);

  const debouncedFilter = useRef(debounce((nextValue: string, showSelectedQuestions: boolean) => {
    props.onFilterChange && props.onFilterChange(nextValue, showSelectedQuestions);
  }, 1000)).current;

  const onExpand = (data: any, node: any) => {
    if (node.expanded) {
      const inx = data.findIndex((d: string) => d === node.node.key);
      if (inx === -1) {
        data.push(node.node.key);
      }
    } else {
      const inx = data.findIndex((d: string) => d === node.node.key);
      if (inx !== -1) {
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
            <TreeNode key={item.key} title={item.title} disableCheckbox={item.disableCheckbox}>
              {loop(item.children)}
            </TreeNode>
          </>
        );
      }
      return item ? <TreeNode key={item.key} title={item.title} disableCheckbox={props.defaultQuestions?.includes(item.key)}/> : '';
    });

  const allowDrop = ({ dropNode }: any) => {
    const nodeKeyArr = dropNode.key.split('-');
    nodeKeyArr.splice(-2, 2);
    return nodeKeyArr.join() === dragEntity;
  };

  const toggleSelectedQuestions = () => {
    setShowSelectedQuestions(!showSelectedQuestions);
  }

  const onDragStart = ({ node }: any) => {
    const nodeKeyArr = node.key.split('-');
    nodeKeyArr.splice(-2, 2);
    setDragEntity(nodeKeyArr.join());
  };

  const onFilter = (event: any) => {
    const val = event.target.value;
    setFilterVal(val);
  }

  useEffect(() => {
    debouncedFilter(filterVal, showSelectedQuestions);
  }, [filterVal, showSelectedQuestions])

  return (
    <TreeViewWrapper
      style={{ pointerEvents: props.disabled ? 'none' : 'all' }}
      className={'pt-3 pl-3 tree-view-wrapper'}
    >
      <div className={props.headerClassname}>
        <LegendWrapper className="mx-3 mb-3">
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
        {useMemo(() => props.showFilter && <div>
          <input className="w-100 my-2" placeholder={props.filterPlaceholder} type='text' name="search" value={filterVal} onChange={onFilter} />
          <Form.Check
            type={'checkbox'}
            label={`Show Selected Items`}
            defaultChecked={showSelectedQuestions}
            checked={showSelectedQuestions}
            onChange={toggleSelectedQuestions}
            className="mt-2"
          />
          <strong className='mt-1 text-danger d-block'>
            {"Below items were selected by candidate for this meeting. Please un-select the above to see all questions"}
          </strong>
        </div>, [filterVal, onFilter])}
      </div>
      {useMemo(() => !!props.data?.length && (
        props.expandedKeys ? <Tree
          className={props.bodyClassname}
          filterTreeNode={() => true}
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
          checkedKeys={props.checkedKeys}
          expandedKeys={props.expandedKeys}
        >
          {loop(props.data)}
        </Tree> : <Tree
          className={props.bodyClassname}
          filterTreeNode={() => true}
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
          checkedKeys={props.checkedKeys}
        >{loop(props.data)}</Tree>
      ), [props.data, props.checkedKeys])}
    </TreeViewWrapper>
  );
}
