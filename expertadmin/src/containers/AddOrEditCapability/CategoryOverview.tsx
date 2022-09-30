import 'rc-tree/assets/index.css';

import { DotFill as Dot } from '@styled-icons/octicons/DotFill';
import { IconContainer } from 'components/IconContainer';
import { useAddOrEditCapability } from 'features/addOrEditCapability/useAddOrEditCapability';
import Tree, { TreeNode } from 'rc-tree';
import React, { useEffect } from 'react';
import { CapabilityTree, SubcategoryTree } from 'types';

type CategoryOverviewProps = {
  categoryId: string;
};

export const CategoryOverview = ({ categoryId }: CategoryOverviewProps) => {
  const { getCategoryTree, categoryOverviewTree } = useAddOrEditCapability();

  useEffect(() => {
    if (categoryId) getCategoryTree(categoryId);
  }, [categoryId]);

  const style = {
    fontSize: '14px',
  };

  const icon = <IconContainer color=" #5C5C5C" icon={Dot} />;
  return (
    <div style={{ margin: '0 20px' }}>
      {categoryOverviewTree && (
        <Tree showLine checkable={false} defaultExpandAll selectable={false}>
          <TreeNode
            style={style}
            icon={icon}
            title={categoryOverviewTree?.title}
            key={categoryOverviewTree?.categoryId}
          >
            {categoryOverviewTree?.capabilities.map((cap) => (
              <TreeNode
                icon={icon}
                title={cap.capabilityText}
                key={cap.capabilityId}
              />
            ))}
            {categoryOverviewTree?.subcategories.map(
              (sub: SubcategoryTree, index: number) => (
                <TreeNode
                  icon={icon}
                  title={sub.title}
                  key={sub?.subCategoryId + index}
                >
                  {sub?.capabilities?.length &&
                    sub?.capabilities.map((cap: CapabilityTree) => (
                      <TreeNode
                        icon={icon}
                        title={cap.capabilityText}
                        key={cap.capabilityId}
                      />
                    ))}
                </TreeNode>
              )
            )}
          </TreeNode>
        </Tree>
      )}
    </div>
  );
};
