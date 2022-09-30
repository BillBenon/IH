import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AddOrEditQuestionResponse, GetAllHintResponse } from 'types';
import BrowserStorage from 'utils/broswer-storage';
import { isNumeric } from 'utils/commonutils';
import { DefaultPaginationCount, Market, MenuItems } from 'utils/constants';

import {
  addHint,
  addQuestion,
  addSampleSolution,
  completeQuestion,
  getHints,
  getQuestionsDetails,
  updateHint,
  updateQuestion,
  updateSampleSolution,
} from './addOrEditQuestionActions';
import {
  reset,
  resetHintsToAdd,
  resetSolutionsToAdd,
  setHintRequestSkipCount,
  setHintRequestText,
  setInitialQuestion,
  setQuestionState,
  updateHighlightedHint,
} from './addOrEditQuestionSlice';

export const useAddOrEditQuestion = () => {
  const params: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const expert = useSelector((state: RootState) => state.auth.expert);
  const {
    question,
    loading,
    saveSuccess,
    hints,
    totalHints,
    hintsToAdd,
    solutionsToAdd,
    hintRequest,
  } = useSelector((state: RootState) => state.addOrEditQuestion);
  const { questionId } = question!;
  const { expertId } = expert!;
  const market = Market.INTERVIEWHELP;

  const fetQuestionDetails = async (paramId: string) => {
    if (paramId) {
      if (!isNumeric(paramId)) {
        const questionId = paramId;
        dispatch(getQuestionsDetails({ questionId, expertId }));
      } else {
        const values = await BrowserStorage.getItem(MenuItems.questions);
        const inx =
          values && values?.findIndex((val: any) => val.param === params.id);
        if (inx != undefined && inx != -1 && values[inx]?.data) {
          dispatch(setInitialQuestion(values[inx].data));
        } else {
          dispatch(setInitialQuestion());
        }
      }
    }
  };

  const setInitialQuestionOnLoad = () => {
    dispatch(setInitialQuestion());
  }

  const saveQuestionDetails = (
    data: AddOrEditQuestionResponse,
    quesId?: string
  ) => {
    const hintIds = (data.hints || []).map((hh) => hh.id);
    const solutionIds = (data.sampleSolutions || []).map((ss) => ss.id);
    if (!isNumeric(quesId ?? params.id))
      dispatch(
        updateQuestion({
          ...data,
          expertId,
          updatedBy: expertId,
          questionId,
          hintIds,
          solutionIds,
        })
      );
    else
      dispatch(
        addQuestion({
          ...data,
          expertId,
          createdBy: expertId,
          market,
          hintIds,
          solutionIds,
        })
      );
  };

  const handleAddHint = () => {
    dispatch(addHint({ expertId, createdBy: expertId }));
  };

  const handleUpdateHint = (hint: {
    hintId: string;
    description: string;
    title: string;
  }) => {
    const { description, hintId, title } = hint;
    dispatch(
      updateHint({ expertId, description, updatedBy: expertId, hintId, title })
    );
  };

  const handleAddSampleSolution = () => {
    dispatch(
      addSampleSolution({
        expertId,
        createdBy: expertId,
        hints: [],
        description: '',
        title: '',
      })
    );
  };

  const handleUpdateSampleSolution = (sampleSolution: {
    sampleSolutionId: string;
    description: string;
    hints: string[];
    title: string;
  }) => {
    const { description, sampleSolutionId, hints, title } = sampleSolution;
    dispatch(
      updateSampleSolution({
        expertId,
        description,
        updatedBy: expertId,
        sampleSolutionId,
        hints,
        title,
      })
    );
  };

  const publishQuestionDetails = () => {
    dispatch(
      completeQuestion({ expertId, questionId: questionId || params.id })
    );
  };

  const getAllHints = (hintSearch?: string, skipCount?: number) => {
    dispatch(
      getHints({
        expertId,
        skipCount: skipCount || 0,
        count: DefaultPaginationCount,
        hintSearch: hintSearch || '',
      })
    );
  };

  const setHighlightedHint = (hint: GetAllHintResponse) => {
    dispatch(updateHighlightedHint(hint));
  };

  const setHintsToAdd = (hintsToAdd: GetAllHintResponse[]) => {
    dispatch(resetHintsToAdd(hintsToAdd));
  };

  const handleHintSearchSkipCount = (skipcount: number) => {
    dispatch(setHintRequestSkipCount(skipcount));
  };

  const handleHintSearchText = (text: string) => {
    dispatch(setHintRequestText(text));
  };

  const clearSolutionsToAdd = () => {
    dispatch(resetSolutionsToAdd());
  };

  const updateQuestionState = (state: string) => {
    dispatch(setQuestionState(state));
  };

  const initializeAddOrEditQuestion = () => {
    dispatch(reset());
  };

  return {
    initializeAddOrEditQuestion,
    handleUpdateSampleSolution,
    handleHintSearchSkipCount,
    handleAddSampleSolution,
    publishQuestionDetails,
    handleHintSearchText,
    saveQuestionDetails,
    setHintsToAdd,
    clearSolutionsToAdd,
    setHighlightedHint,
    fetQuestionDetails,
    handleUpdateHint,
    handleAddHint,
    getAllHints,
    updateQuestionState,
    setInitialQuestionOnLoad,
    hints,
    params,
    question,
    loading,
    updateHint,
    totalHints,
    hintRequest,
    saveSuccess,
    hintsToAdd,
    solutionsToAdd,
  };
};
