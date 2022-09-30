import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import { CapsuleButton } from '../../../components/Common/CapsuleButton';
import { CapsuleDropdown } from '../../../components/Common/CapsuleDropdown';
import { Paginator } from '../../../components/Paginator';
import { LoaderStyles } from '../../../pages/ExpertView/ExpertView';
import { ButtonTypes, DefaultFilters, FeedbackSentArray, FEEDBACK_TYPES, FilterKeys, QueryType } from '../../../utilities/constants';
import { Filter } from '../../Login/ILogin';
import { StyledQueryFilters } from './QueryFilters.styles';
import { Submissions } from './Submissions';
import useQueryFilters from './TabContent.utils';

const StyledQueryFiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TabContent = () => {
  const [{
    lastActivity,
    loading,
    activeTab,
    filterCount,
    candidateList,
    setQuery,
  }] = useQueryFilters();
  return (
    <>
      <BeatLoader
        css={LoaderStyles}
        color={"#3694D7"}
        loading={loading}
      ></BeatLoader>
      <StyledQueryFiltersContainer>
        <StyledQueryFilters className={"w-100"}>
          <CapsuleButton
            onClick={() => setQuery(ButtonTypes.NEW())}
            text={DefaultFilters.New}
            type="button"
            count={filterCount && filterCount[FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT]}
            active={lastActivity.saveQueries[activeTab]?.queryType == QueryType.FIXED && lastActivity.saveQueries[activeTab].fixedQuery == FilterKeys.NEW}
          />
          <CapsuleButton
            onClick={() => setQuery(ButtonTypes.INPROGRESS())}
            text={DefaultFilters.InProgress}
            type="button"
            count={filterCount && filterCount[FEEDBACK_TYPES.EXPERT_REVIEWING_RESPONSE]}
            active={lastActivity.saveQueries[activeTab]?.queryType == QueryType.FIXED && lastActivity.saveQueries[activeTab].fixedQuery == FilterKeys.INPROGRESS}
          />
          <CapsuleDropdown
            index={activeTab}
            label={DefaultFilters.candidate}
            options={candidateList}
            valueName={lastActivity.saveQueries[activeTab]?.query.filters?.find((filter: Filter) => filter.filterKey == FilterKeys.CANDIDATE)?.filterValueName ?? null}
            value={lastActivity.saveQueries[activeTab]?.query.filters?.find((filter: Filter) => filter.filterKey == FilterKeys.CANDIDATE)?.filterValueId ?? "0"}
            handleSelect={(value: string, label: string) => setQuery(ButtonTypes.CANDIDATE(value, label, FilterKeys.CANDIDATE))}
          />
          <CapsuleDropdown
            index={activeTab}
            label={DefaultFilters.feedbacksent}
            options={FeedbackSentArray}
            valueName={FeedbackSentArray.find((arr: any) => arr.id == lastActivity.saveQueries[activeTab]?.query.filters?.find((filter: Filter) => filter.filterKey == FilterKeys.FEEDBACKSENT)?.filterValueId)?.name ?? null}
            value={lastActivity.saveQueries[activeTab]?.query.filters?.find((filter: Filter) => filter.filterKey == FilterKeys.FEEDBACKSENT)?.filterValueId ?? "0"}
            handleSelect={(value: string, label: string) => setQuery(ButtonTypes.FEEDBACKSENT(value, 'BETWEEN', FilterKeys.FEEDBACKSENT))}
          />
        </StyledQueryFilters>
      </StyledQueryFiltersContainer>
      <Submissions />
    </>
  )
};
