import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { useAppHistory } from 'context/appHistory';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GetResultForQuestionRequest } from 'types';
import { isNumeric } from 'utils/commonutils';
import { MenuItems, Routes } from 'utils/constants';

import { getQuestions } from './questionActions';
import {
  setPaginationFilter,
  setQuestionInputFilter,
  setSelectedQuestion,
  setView,
  reset,
} from './questionSlice';

export const useQuestions = () => {
  const history = useHistory();
  const { recentItems, pushHistory } = useAppHistory();
  const expert = useSelector((state: RootState) => state.auth.expert);
  const {
    loading,
    questions,
    view,
    selectedQuestion,
    totalQuestions,
    filterRequest,
  } = useSelector((state: RootState) => state.question);
  const dispatch = useAppDispatch();

  const fetchQuestions = (textToSearch?: string) => {
    if (expert)
      dispatch(
        getQuestions({
          ...filterRequest,
          textToSearch: textToSearch ?? filterRequest.textToSearch,
          expertId: expert.expertId,
          updatedDateTo: filterRequest.updatedDateFrom
            ? filterRequest.updatedDateTo
            : '',
        })
      );
  };

  const setQuestionFilter = (request: GetResultForQuestionRequest) => {
    const {
      textToSearch,
      searchInTitle,
      searchInDescription,
      updatedDateFrom,
      capabilityId,
    } = request;
    dispatch(
      setQuestionInputFilter({
        textToSearch,
        searchInTitle,
        searchInDescription,
        updatedDateFrom,
        capabilityId,
      })
    );
  };

  const setPaginationFilters = (skipCount: number) => {
    dispatch(setPaginationFilter({ skipCount }));
  };

  const updateView = (view: 'list' | 'side') => {
    dispatch(setView(view));
  };

  const updateSelectedquestion = (questionId: string) => {
    dispatch(setSelectedQuestion(questionId));
  };

  const routeToAddOrEditQuestion = (
    isAdd?: boolean,
    questionId?: string,
    title?: string
  ) => {
    if (!questionId) {
      questionId = selectedQuestion?.questionId;
    }
    if (!isAdd && questionId) {
      pushHistory(MenuItems.questions, questionId, { title });
      history.push(Routes[MenuItems.questions] + `/${questionId}`);
    } else {
      history.push(
        Routes[MenuItems.questions] +
        `/${(recentItems[MenuItems.questions]?.filter((m: any) =>
          isNumeric(m.param)
        )?.length || 0) + 1
        }`
      );
    }
  };

  const initializeQuestions = () => {
    dispatch(reset());
  };

  return [
    {
      routeToAddOrEditQuestion,
      setQuestionFilter,
      setPaginationFilters,
      updateSelectedquestion,
      updateView,
      fetchQuestions,
      initializeQuestions,
      loading,
      questions,
      view,
      selectedQuestion,
      totalQuestions,
      filterRequest,
    },
  ];
};
