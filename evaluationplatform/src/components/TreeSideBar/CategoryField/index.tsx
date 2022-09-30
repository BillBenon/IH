import React, { useState } from 'react';
import { SubCategoryField } from '../..';
import { ExpandIcon, CollapseIcon } from '../../../assets';
import styled from 'styled-components';

const StyledCategory = styled.div<{ expanded: boolean }>`
  .category__header {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 35px;
  }
  .category__header img {
    width: 20px;
    height: 20px;
    margin-right: 26px;
  }
  .category__name {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: #383838;
    margin-left: 27px;
  }
  .category__body {
    display: ${(props) => (props.expanded ? 'block' : 'none')};
  }
`;

interface IProps {
  idx: number;
  setCapability: any;
  value: {
    categoryName: string;
    order: number;
    subCategories: Array<any>;
  };
  setScrollPosition: Function;
}

export const CategoryField: React.FC<IProps> = (props) => {
  let [expanded, setExpanded] = useState(true);
  const handleClick = () => {
    setExpanded(!expanded);
  };
  // useEffect(() => {
  //   if (props.idx === 0) {
  //     setExpanded(true);
  //   }
  //   // eslint-disable-next-line
  // }, []);
  return (
    <StyledCategory expanded={expanded}>
      <div onClick={handleClick} className="category__header">
        <div className="category__name">{props.value.categoryName}</div>
        <img src={expanded ? CollapseIcon : ExpandIcon} alt="down_arrow" />
      </div>
      <div className="category__body">
        {props.value.subCategories.map((item, idx) => (
          <SubCategoryField
            value={item}
            key={idx}
            setScrollPosition={props.setScrollPosition}
            setCapability={props.setCapability} />
        ))}
      </div>
    </StyledCategory>
  );
};
