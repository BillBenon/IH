import { isUndefined } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { saveLastActivity } from '../../actions/auth/authActions';
import { addNewQuery, deleteQuery } from '../../actions/auth/authSlice';
import { getFilteredSubmissions } from '../../actions/expert/query/queriesActions';
import { setActiveTab } from '../../actions/expert/query/queriesSlice';
import { setActiveCard } from '../../actions/expert/query/submission/submissionSlice';
import { RootState } from '../../store';
import { DEFAULT_TOKEN } from '../../utilities/constants';
import { InitialActivity } from '../../utilities/defaults';
import { GetResultFromQuery } from './IFeedback';

const useFeedback = () => {
  const expertId = useSelector((state: RootState) => state.auth.user.expertId);
  const dispatch = useDispatch();
  const lastActivity = useSelector((state: RootState) => state.auth.user.lastActivity);
  const activeTab = useSelector((state: RootState) => state.expertFeedbackQueries.activeTab);

  const handleTabClick = (e: any, index: number) => {
    e.stopPropagation();
    dispatch(setActiveTab({ index }));
  }

  const handleTabDelete = (index: number) => {
    dispatch(deleteQuery({ index }));
    dispatch(setActiveTab({ index: activeTab >= index && index ? activeTab - 1 : 0 }));
  }

  const handleTabAdd = () => {
    dispatch(addNewQuery({ query: InitialActivity.saveQueries[0] }));
    !!lastActivity.saveQueries?.length && dispatch(setActiveTab({ index: lastActivity.saveQueries.length }));
  }

  const getFilteredData = () => {
    if (lastActivity && lastActivity.saveQueries[activeTab]) {
      let input: GetResultFromQuery = {
        token: DEFAULT_TOKEN,
        expertId: expertId,
        ...lastActivity.saveQueries[activeTab]
      }
      dispatch(getFilteredSubmissions(input));
      dispatch(setActiveCard({ activeTab }));
      dispatch(saveLastActivity({ ...lastActivity, token: DEFAULT_TOKEN, expertId: expertId }));
    }
  }

  useEffect(getFilteredData, [activeTab, lastActivity]);

  return [{
    lastActivity,
    activeTab,
    handleTabClick,
    handleTabDelete,
    handleTabAdd
  }];
}

export default useFeedback;