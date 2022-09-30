import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddOrEditQuestionResponse,
  GetAllHintResponse,
  GetHintsRequest,
  SampleSolution,
} from 'types';
import { DefaultPaginationCount, State } from 'utils/constants';
import { initialQuestion } from 'utils/defaults';

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

interface IInitialState {
  error: boolean;
  success: boolean;
  loading: boolean;
  question: AddOrEditQuestionResponse;
  saveSuccess: boolean;
  hints: GetAllHintResponse[];
  totalHints: number;
  hintsToAdd: GetAllHintResponse[];
  solutionsToAdd: SampleSolution[];
  hintRequest: GetHintsRequest;
}

const initialState: IInitialState = {
  error: false,
  success: false,
  loading: false,
  question: initialQuestion,
  saveSuccess: false,
  hints: [],
  totalHints: 0,
  hintsToAdd: [],
  solutionsToAdd: [],
  hintRequest: {
    hintSearch: '',
    expertId: '',
    skipCount: 0,
    count: DefaultPaginationCount,
    flags: { case_sensitive: false, exact_match: false },
  },
};

const addOrEditQuestionSlice = createSlice({
  name: 'addOrEditQuestion',
  initialState,
  reducers: {
    setInitialQuestion(
      state,
      { payload }: PayloadAction<AddOrEditQuestionResponse | undefined>
    ) {
      if (payload) state.question = payload;
      else state.question = initialQuestion;
    },
    updateHighlightedHint(
      state,
      { payload }: PayloadAction<GetAllHintResponse>
    ) {
      const inx = state.hintsToAdd.findIndex((hh) => hh.id === payload.id);
      if (inx === -1) state.hintsToAdd.push(payload);
      else state.hintsToAdd.splice(inx, 1);
    },
    resetHintsToAdd(state, { payload }: PayloadAction<GetAllHintResponse[]>) {
      state.hintsToAdd = payload;
    },
    setHintRequestSkipCount(state, { payload }: PayloadAction<number>) {
      state.hintRequest.skipCount = payload;
    },
    setHintRequestText(state, { payload }: PayloadAction<string>) {
      state.hintRequest.hintSearch = payload;
    },
    resetSolutionsToAdd(state) {
      state.solutionsToAdd = [];
    },
    setQuestionState(state, { payload }: PayloadAction<string>) {
      state.question.state = payload;
      if (payload != State.DISABLED) {
        state.question.disabled = false;
        state.question.disableReason = '';
      }
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestionsDetails.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getQuestionsDetails.fulfilled, (state, action) => {
      state.question = action.payload?.data?.output;
      if (state.question) {
        state.question.level = '' + action.payload?.data?.output.level;
        if (state.question.disabled) state.question.state = State.DISABLED;
      } else {
        state.question = initialQuestion;
      }
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getQuestionsDetails.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(updateQuestion.pending, (state) => {
      state.error = false;
      state.saveSuccess = false;
      state.loading = true;
      if (state.question?.disabled) state.question.state = State.DISABLED;
    });
    builder.addCase(updateQuestion.fulfilled, (state) => {
      state.saveSuccess = true;
      state.loading = false;
    });
    builder.addCase(updateQuestion.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(addQuestion.pending, (state) => {
      state.error = false;
      state.saveSuccess = false;
      state.loading = true;
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      if (action.payload) {
        state.saveSuccess = true;
        state.question.questionId = action.payload?.data?.output.questionId;
        if (state.question?.disabled) state.question.state = State.DISABLED;
      }
      state.loading = false;
    });
    builder.addCase(addQuestion.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(addHint.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(addHint.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      if (action.payload?.data.output.id)
        state.hintsToAdd = [
          {
            id: action.payload?.data.output.id,
            title: '',
            description: '',
            createdAt: '',
            updatedAt: '',
            expertId: '',
            createdBy: '',
            updatedBy: '',
          },
        ];
    });
    builder.addCase(addHint.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(updateHint.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(updateHint.fulfilled, (state) => {
      state.success = true;
      state.loading = false;
    });
    builder.addCase(updateHint.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(completeQuestion.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(completeQuestion.fulfilled, (state) => {
      state.success = true;
      state.question.state = State.COMPLETED;
      state.loading = false;
    });
    builder.addCase(completeQuestion.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(getHints.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getHints.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.hints = action.payload?.data?.output?.hints || [];
      state.totalHints = action.payload?.data?.output?.totalCount || 0;
      state.hintRequest.skipCount =
        state.hintRequest.skipCount >= state.totalHints
          ? 0
          : state.hintRequest.skipCount;
    });
    builder.addCase(getHints.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(addSampleSolution.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(addSampleSolution.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      const newQuestionSampleSolution = {
        id: action.payload?.data.output.id,
        hints: [],
        description: '',
        title: '',
      };
      state.solutionsToAdd.push(newQuestionSampleSolution);
    });
    builder.addCase(addSampleSolution.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(updateSampleSolution.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(updateSampleSolution.fulfilled, (state) => {
      state.success = true;
      state.loading = false;
    });
    builder.addCase(updateSampleSolution.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const {
  reset,
  setQuestionState,
  setInitialQuestion,
  updateHighlightedHint,
  resetHintsToAdd,
  resetSolutionsToAdd,
  setHintRequestSkipCount,
  setHintRequestText,
} = addOrEditQuestionSlice.actions;

export default addOrEditQuestionSlice.reducer;
