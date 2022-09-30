import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateQuery } from '../../../actions/auth/authSlice';
import { setActiveCard } from '../../../actions/expert/query/submission/submissionSlice';
import { RootState } from '../../../store';
import { Query } from '../IFeedback';

const useQueryFilters = () => {
    const dispatch = useDispatch();
    const {
        activeTab
    } = useSelector((state: RootState) => state.expertFeedbackQueries);
    const lastActivity = useSelector((state: RootState) => state.auth.user.lastActivity);
    const {
        filterCount,
        candidateList,
        loading,
    } = useSelector((state: RootState) => state.expertFeedbackQueries);

    const setQuery = (query: { count: number, skipCount: number, fixedQuery: string, query: Query }) => {
        dispatch(updateQuery({ index: activeTab, value: query }));
        dispatch(setActiveCard({}));
    }

    return [{
        setQuery,
        lastActivity,
        loading,
        filterCount,
        candidateList,
        activeTab
    }];
}

export default useQueryFilters;