import React from "react";
import {
  StyledTab,
  StyledIcon,
  StyledCloseIcon,
  StyledNavTabs,
  TabContent,
  ListContent,
} from "./QueryTabs.styles";
import { AddQueryTab } from "./AddQueryTab";

interface IProps {
  min?: number;
  max?: number;
  summaryTab?: boolean;
  precedingText?: string | undefined;
  tabDetails: TabDetail[];
  activeIndex: number;
  handleClick: Function;
  handleDelete?: Function | undefined;
  handleAdd?: Function | undefined;
}

interface TabDetail {
  name: string;
  identifier: number | undefined;
}

export const QueryTabs = (props: IProps) => {
  let tabs = props.tabDetails;
  if (props.summaryTab) {
    tabs?.push({ name: 'All', identifier: undefined });
  }
  const allTabs = tabs?.map((tab: TabDetail, inx: number) => (
    <ListContent key={inx} {...{ activeIndex: props.activeIndex, index: tab.identifier, tabslength: tabs?.length }}>
      <StyledTab
        {...{ activeIndex: props.activeIndex, index: tab.identifier }}
      >
        <TabContent
          {...{ activeIndex: props.activeIndex, index: tab.identifier }}
          onClick={(e) => props.handleClick(e, tab.identifier)}
        >
          {(props.tabDetails.length == inx + 1 && props.summaryTab) ? 'All' : ((props.precedingText ?? "") + tab.name)}
        </TabContent>
        {!!props.handleDelete && (props.min ? tabs.length > props.min : true) && <StyledIcon onClick={(e) => props.handleDelete && props.handleDelete(tab.identifier)}>
          <StyledCloseIcon />
        </StyledIcon>}
      </StyledTab>
    </ListContent>
  ));
  return (
    <StyledNavTabs>
      {allTabs}
      <ListContent {...{ activeIndex: props.activeIndex, index: -1 }}>
        {props.handleAdd && (props.max ? allTabs.length < props.max : true) ? <AddQueryTab handleAdd={props.handleAdd} /> : null}
      </ListContent>
    </StyledNavTabs>
  );
};
