import './styles.css';

import React from 'react';
import styled from 'styled-components';

import { QueryTabs } from '../../components/Expert/Feedback/QueryTabs';
import { StyledQueryContent } from './Feedback.styles';
import useFeedback from './Feedback.utils';
import { TabContent } from './TabContent';

const FeedBackWrapper = styled.div`
  margin: 10px;
`;

export const Feedback: React.FC = () => {
  const [
    {
      lastActivity,
      activeTab,
      handleTabClick,
      handleTabDelete,
      handleTabAdd,
    },
  ] = useFeedback();
  return (
    lastActivity ? <FeedBackWrapper>
      <QueryTabs
        min={1}
        max={10}
        precedingText="Tab"
        tabDetails={lastActivity.saveQueries?.map((q: any, index: number) => { return { name: "" + q?.tabOrder, identifier: index } as any; })}
        activeIndex={activeTab}
        handleClick={(e: any, index: number) => handleTabClick(e, index)}
        handleDelete={(index: number) => handleTabDelete(index)}
        handleAdd={() => handleTabAdd()}
      />
      <StyledQueryContent>
        {!!lastActivity.saveQueries.length && <TabContent />}
      </StyledQueryContent>
    </FeedBackWrapper> : null
  );
};
