import React from 'react';
import { CapabilityField } from '../../..';
import styled from 'styled-components';

const StyledSubCategory = styled.div`
  .subcategory__name {
    margin-top: 16px;
    margin-bottom: 20px;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #383838;
    margin-left: 49px;
  }
  .subcategory__body {
    background: #eeeeee;
  }
  .capabilityItem:first-child::before {
    display: none;
  }
  .capabilityItem::before {
    margin-left: ${(props: any) => (props.value && props.value.subCategoryName === '' ? '25px' : '61px')};
  }
  .subcategory__body .treesidebar-status-icon {
    margin-left: ${(props: any) => (props.value && props.value.subCategoryName === '' ? '25px' : '61px')};
  }
`;

interface IProps {
  setCapability: any;
  value: {
    subCategoryName: string;
    capabilities: Array<any>;
  };
  setScrollPosition: Function;
}

export const SubCategoryField: React.FC<IProps> = (props) => {
  return (
    <StyledSubCategory {...props}>
      {props.value.subCategoryName !== '' ? (
        <div className="subcategory__name">{props.value.subCategoryName}</div>
      ) : null}
      <div className="subcategory__body">
        {props.value.capabilities.map((item, idx) => (
          <CapabilityField
          value={item}
          key={idx}
          setScrollPosition={props.setScrollPosition}
          setCapability={props.setCapability} />
        ))}
      </div>
    </StyledSubCategory>
  );
};
