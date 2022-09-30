import { IconContainer } from 'components/Common/IconContainer';
import React from 'react';
import styled from 'styled-components';

export type ActionItemProps = {
  icon: any;
  onClick: Function;
  tooltip: string;
  color?: string;
  height?: string;
  isStatic?: boolean;
};

type PrepareNodeProps = {
  title: string;
  actionItems?: ActionItemProps[];
  onClick?: Function; // will be used for any action on label click
  style?: object;
  isSelected?: boolean;
};

type TreeNodeProps = {
  isSelected?: boolean;
  isStatic?: boolean;
};

const TreeNode = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;

  :hover {
    .hoverActions {
      display: flex !important;
    }
    .staticActions {
      display: none !important;
    }
  }
  .hoverActions {
    display: none !important;
  }
  .staticActions {
    display: flex !important;
  }
  > p {
    font-weight: ${({ isSelected }: TreeNodeProps) =>
    isSelected ? 'bold !important' : 'normal !important'};
    font-size: 20px;
    line-height: 18px;
    display: flex;
    align-items: center;
    letter-spacing: 0.16px;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
  }
`;

const ActionItemContainer = styled.div`
  display: flex;
  height: 100%;
  position: absolute !important;
  background: rgb(235 235 235);
  right: 0px;
  top: 0;
  align-items: baseline;
`;

export const makeTreeNode = ({
  title,
  actionItems = [],
  onClick,
  style,
  isSelected,
}: PrepareNodeProps) => {
  const onIconClick = (event: any, item: ActionItemProps) => {
    item.onClick();
    event.stopPropagation();
  };

  return (
    <>
      <TreeNode
        isSelected={isSelected}
        onClick={() => onClick && onClick()}
      >
        <p style={style}>{title}</p>
        <div>
          <ActionItemContainer className='d-flex hoverActions'>
            {actionItems.map((item: ActionItemProps, index: number) => (
              <IconContainer
                tooltip={item.tooltip}
                color={item.color}
                height={item.height ?? '16px'}
                onClick={(event: any) => onIconClick(event, item)}
                key={index}
                icon={item.icon}
              />
            ))}
          </ActionItemContainer>
          <ActionItemContainer className='d-flex staticActions'>
            {actionItems?.filter((item: ActionItemProps) => item.isStatic)?.map((item: ActionItemProps, index: number) => (
              <IconContainer
                tooltip={item.tooltip}
                color={item.color}
                height={item.height ?? '16px'}
                onClick={(event: any) => onIconClick(event, item)}
                key={index}
                icon={item.icon}
                className="iconWrapper"
              />
            ))}
          </ActionItemContainer>
        </div>
      </TreeNode>
    </>
  );
};
