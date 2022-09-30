import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GetResultForQuestionRequest,
  PaginationFilters,
  Question,
  Filter,
  SelectedQuestion,
} from 'types';
import { initialQuestionFilter } from 'utils/defaults';

import { getQuestions } from './questionActions';

interface IInitialState {
  loading: boolean;
  success: boolean;
  error: boolean;
  questions: Question[];
  view: 'list' | 'side';
  selectedQuestion: SelectedQuestion | undefined;
  totalQuestions: number;
  filterRequest: GetResultForQuestionRequest;
}

const initialState: IInitialState = {
  loading: false,
  success: false,
  error: false,
  questions: [],
  view: 'list',
  selectedQuestion: undefined,
  totalQuestions: 0,
  filterRequest: initialQuestionFilter,
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setView(state, { payload }: PayloadAction<'list' | 'side'>) {
      state.view = payload;
    },
    setSelectedQuestion(state, { payload }: PayloadAction<string>) {
      const inx = state.questions.findIndex(
        (question: Question) => question.questionId === payload
      );
      state.selectedQuestion = state.questions[inx];
      if (inx != -1 && inx < state.questions?.length - 1) {
        state.selectedQuestion.nextQuestion = state.questions[inx + 1].title;
        state.selectedQuestion.nextQuestionId =
          state.questions[inx + 1].questionId;
      }
      if (inx > 0) {
        state.selectedQuestion.prevQuestionId =
          state.questions[inx - 1].questionId;
      }
    },
    setNextSelected(state, { payload }: PayloadAction<string>) {
      const inx = state.questions.findIndex(
        (question: Question) => question.questionId === payload
      );
      if (state.questions.length > inx)
        state.selectedQuestion = state.questions[inx + 1];
    },
    setPrevSelected(state, { payload }: PayloadAction<string>) {
      const inx = state.questions.findIndex(
        (question: Question) => question.questionId === payload
      );
      if (state.questions.length > 0 && inx > 0)
        state.selectedQuestion = state.questions[inx - 1];
    },
    setQuestionInputFilter(
      state,
      { payload }: PayloadAction<Filter & { capabilityId?: string }>
    ) {
      state.filterRequest.textToSearch = payload.textToSearch;
      state.filterRequest.searchInTitle = payload.searchInTitle;
      state.filterRequest.searchInDescription = payload.searchInDescription;
      state.filterRequest.updatedDateFrom = payload.updatedDateFrom;
      state.filterRequest.capabilityId = payload.capabilityId;
    },
    setPaginationFilter(state, { payload }: PayloadAction<PaginationFilters>) {
      if (payload.count != undefined) state.filterRequest.count = payload.count;
      state.filterRequest.skipCount = payload.skipCount;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestions.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.questions = action.payload?.data?.output.questions;
      state.totalQuestions = action.payload?.data?.output.totalCount;
      if (!state.totalQuestions) state.selectedQuestion = undefined;
      state.filterRequest.skipCount =
        state.filterRequest.skipCount >= action.payload?.data?.output.totalCount
          ? 0
          : state.filterRequest.skipCount;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getQuestions.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const {
  reset,
  setView,
  setNextSelected,
  setPrevSelected,
  setSelectedQuestion,
  setPaginationFilter,
  setQuestionInputFilter,
} = questionSlice.actions;

export default questionSlice.reducer;
