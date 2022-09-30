import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CategoryTree,
  GetAllCategoriesAndSubCategoriesResponse,
  GetCapabilityResponse,
  GetHintsRequest,
} from 'types';
import { DefaultPaginationCount, State } from 'utils/constants';
import { initialCapability } from 'utils/defaults';

import {
  addCapability,
  addCategory,
  addSubCategory,
  attachEvaluationToQuestion,
  completeCapability,
  editCategory,
  editSubCategory,
  fetchCategory,
  fetchCategoryTree,
  fetchSubCategory,
  getCapabilityDetails,
  getCategoriesAndSubcategories,
  insertQuestionToCapability,
  removeCategory,
  removeQuestionToCapability,
  removeSubCategory,
  updateCapability,
} from './addOrEditCapabilityActions';

interface IInitialState {
  error: boolean;
  categorysuccess: boolean;
  success: boolean;
  loading: boolean;
  capability: GetCapabilityResponse;
  saveSuccess: boolean;
  totalHints: number;
  hintRequest: GetHintsRequest;
  selectedCategory: string;
  selectedSubCategory: string;
  openAddEditCategory: boolean;
  categoryDetail?: any;
  subCategoryDetail?: any;
  categoryOverviewTree?: CategoryTree;
  attachEvaluationSuccess: boolean;
  insertQuestiontoCapabilitySuccess: boolean;
  removeQuestionToCapabilitySuccess: boolean;
  categorysubCategoryLoading: boolean;
  categorySubcategoryList: GetAllCategoriesAndSubCategoriesResponse[];
}

const initialState: IInitialState = {
  error: false,
  success: false,
  loading: false,
  categorysubCategoryLoading: false,
  categorySubcategoryList: [],
  capability: initialCapability,
  saveSuccess: false,
  totalHints: 0,
  categorysuccess: false,
  selectedCategory: '',
  selectedSubCategory: '',
  openAddEditCategory: false,
  attachEvaluationSuccess: false,
  insertQuestiontoCapabilitySuccess: false,
  removeQuestionToCapabilitySuccess: false,
  hintRequest: {
    hintSearch: '',
    expertId: '',
    skipCount: 0,
    count: DefaultPaginationCount,
    flags: { case_sensitive: false, exact_match: false },
  },
};

const addOrEditCapabilitySlice = createSlice({
  name: 'addOrEditCapability',
  initialState,
  reducers: {
    setInitialCapability(
      state,
      { payload }: PayloadAction<GetCapabilityResponse | undefined>
    ) {
      if (payload) state.capability = payload;
      else state.capability = initialCapability;
    },
    setCapabilityState(state, { payload }: PayloadAction<string>) {
      state.capability.state = payload;
      if (payload != State.DISABLED) {
        state.capability.disabled = false;
        state.capability.disableReason = '';
      }
    },
    updateSelectedCategory(state, { payload }: PayloadAction<string>) {
      state.selectedCategory = payload;
    },
    updateSelectedSubCategory(state, { payload }: PayloadAction<string>) {
      state.selectedSubCategory = payload;
    },
    handleOpenAddEditCategory(state, { payload }: PayloadAction<boolean>) {
      state.openAddEditCategory = payload;
    },
    updateCategoryOverview(
      state,
      { payload }: PayloadAction<CategoryTree | undefined>
    ) {
      state.categoryOverviewTree = payload;
    },
    setCategorySuccess(state) {
      state.categorysuccess = false;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getCapabilityDetails.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getCapabilityDetails.fulfilled, (state, action) => {
      state.capability = action.payload?.data?.output;
      if (state.capability) {
        if (state.capability.disabled) state.capability.state = State.DISABLED;
      }
      state.selectedSubCategory = state.capability.subCategoryId;
      state.selectedCategory = state.capability.categoryId;
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getCapabilityDetails.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(updateCapability.pending, (state) => {
      state.error = false;
      state.saveSuccess = false;
      state.loading = true;
      if (state.capability?.disabled) state.capability.state = State.DISABLED;
    });
    builder.addCase(updateCapability.fulfilled, (state, action) => {
      if (action.payload) {
        state.saveSuccess = true;
        state.capability.state = State.INPROGRESS;
      }
      state.loading = false;
    });
    builder.addCase(updateCapability.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(addCapability.pending, (state) => {
      state.error = false;
      state.saveSuccess = false;
      state.loading = true;
    });
    builder.addCase(addCapability.fulfilled, (state, action) => {
      if (action.payload) {
        state.capability.capabilityId =
          action.payload?.data?.output.capabilityId;
        state.saveSuccess = true;
        state.capability.state = State.INPROGRESS;
      }
      state.loading = false;
    });
    builder.addCase(addCapability.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(completeCapability.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(completeCapability.fulfilled, (state) => {
      state.success = true;
      state.capability.state = State.COMPLETED;
      state.loading = false;
    });
    builder.addCase(completeCapability.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(getCategoriesAndSubcategories.pending, (state) => {
      state.error = false;
      state.success = false;
      state.categorysubCategoryLoading = true;
    });
    builder.addCase(
      getCategoriesAndSubcategories.fulfilled,
      (state, action) => {
        state.categorySubcategoryList = action.payload?.data?.output;
        state.success = true;
        state.categorysubCategoryLoading = false;
      }
    );
    builder.addCase(getCategoriesAndSubcategories.rejected, (state) => {
      state.error = true;
      state.categorysubCategoryLoading = false;
    });
    builder.addCase(addCategory.pending, (state) => {
      state.error = false;
      state.categorysuccess = false;
      state.loading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      if (action.payload) {
        state.categorySubcategoryList.push(action.payload?.data.output);
        state.selectedCategory = action.payload?.data.output?.categoryId;
        state.categorysuccess = true;
        state.selectedSubCategory = '';
      }
      state.openAddEditCategory = false;
      state.loading = false;
    });
    builder.addCase(addCategory.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(addSubCategory.pending, (state) => {
      state.error = false;
      state.categorysuccess = false;
      state.loading = true;
    });
    builder.addCase(addSubCategory.fulfilled, (state, action) => {
      if (action.payload) {
        const inx = state.categorySubcategoryList.findIndex((cat) =>
          cat.categoryId === state.selectedCategory
            ? state.selectedCategory
            : action.meta.arg.categoryId
        );
        if (
          state.categorySubcategoryList[inx] &&
          !state.categorySubcategoryList[inx]?.subCategories
        )
          state.categorySubcategoryList[inx].subCategories = [];
        state.categorySubcategoryList[inx]?.subCategories?.push(
          action.payload?.data.output
        );
        state.selectedSubCategory = action.payload?.data.output?.subCategoryId;
        state.categorysuccess = true;
      }
      state.openAddEditCategory = false;
      state.loading = false;
    });
    builder.addCase(addSubCategory.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(editCategory.pending, (state) => {
      state.error = false;
      state.categorysuccess = false;
      state.loading = true;
    });
    builder.addCase(editCategory.fulfilled, (state, action) => {
      state.categorysuccess = true;
      state.openAddEditCategory = false;
      const updatedCategory = action.payload?.data?.output;
      const inx = state.categorySubcategoryList.findIndex(
        (cat) => cat.categoryId === updatedCategory.categoryId
      );
      if (inx != -1) {
        state.categorySubcategoryList[inx].title = updatedCategory.title;
      }
      state.loading = false;
    });
    builder.addCase(editCategory.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(editSubCategory.pending, (state) => {
      state.error = false;
      state.categorysuccess = false;
      state.loading = true;
    });
    builder.addCase(editSubCategory.fulfilled, (state, action) => {
      state.categorysuccess = true;
      state.openAddEditCategory = false;
      const categoryId = action.meta.arg.categoryId;
      const updatedSubCategory = action.payload?.data?.output;
      const inx = state.categorySubcategoryList.findIndex(
        (cat) => cat.categoryId === categoryId
      );
      const subinx = state.categorySubcategoryList[
        inx
      ]?.subCategories?.findIndex(
        (sub) => sub.subCategoryId === updatedSubCategory.subCategoryId
      );
      if (state.categorySubcategoryList[inx]?.subCategories[subinx]) {
        state.categorySubcategoryList[inx].subCategories[subinx].title =
          updatedSubCategory.title;
      }
      state.loading = false;
    });
    builder.addCase(editSubCategory.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(removeCategory.pending, (state) => {
      state.error = false;
      state.categorysuccess = false;
      state.loading = true;
    });
    builder.addCase(removeCategory.fulfilled, (state, action) => {
      if (action.payload) {
        state.categorysuccess = true;
        const deletedCategoryId = action.meta.arg.categoryId;
        const inx = state.categorySubcategoryList.findIndex(
          (cat) => cat.categoryId === deletedCategoryId
        );
        state.categorySubcategoryList.splice(inx, 1);
        if (state.selectedCategory === deletedCategoryId) {
          state.selectedCategory = '';
          state.selectedSubCategory = '';
        }
      }
      state.loading = false;
    });
    builder.addCase(removeCategory.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(removeSubCategory.pending, (state) => {
      state.categorysuccess = true;
      state.error = false;
      state.loading = true;
    });
    builder.addCase(removeSubCategory.fulfilled, (state, action) => {
      if (action.payload) {
        state.categorysuccess = true;
        const deletedSubCategoryId = action.meta.arg.subCategoryId;
        const catInx = state.categorySubcategoryList.findIndex(
          (cat) => cat.categoryId === state.selectedCategory
        );
        const inx = state.categorySubcategoryList[
          catInx
        ]?.subCategories?.findIndex(
          (cat) => cat.subCategoryId === deletedSubCategoryId
        );
        state.categorySubcategoryList[catInx]?.subCategories.splice(inx, 1);
        if (state.selectedSubCategory === deletedSubCategoryId) {
          state.selectedSubCategory = '';
        }
      }
      state.loading = false;
    });
    builder.addCase(removeSubCategory.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(fetchCategory.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.success = true;
      state.categoryDetail = action.payload?.data.output;
      state.loading = false;
    });
    builder.addCase(fetchCategory.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(fetchSubCategory.pending, (state) => {
      state.success = true;
      state.loading = true;
    });
    builder.addCase(fetchSubCategory.fulfilled, (state, action) => {
      state.success = true;
      state.subCategoryDetail = action.payload?.data.output;
      state.loading = false;
    });
    builder.addCase(fetchSubCategory.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(fetchCategoryTree.pending, (state) => {
      state.success = true;
      state.loading = true;
    });
    builder.addCase(fetchCategoryTree.fulfilled, (state, action) => {
      state.success = true;
      state.categoryOverviewTree = action.payload?.data.output;
      state.loading = false;
    });
    builder.addCase(fetchCategoryTree.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(attachEvaluationToQuestion.pending, (state) => {
      state.success = true;
      state.loading = true;
      state.attachEvaluationSuccess = false;
    });
    builder.addCase(attachEvaluationToQuestion.fulfilled, (state) => {
      state.attachEvaluationSuccess = true;
      state.loading = false;
    });
    builder.addCase(attachEvaluationToQuestion.rejected, (state) => {
      state.error = true;
      state.loading = false;
      state.attachEvaluationSuccess = false;
    });
    builder.addCase(insertQuestionToCapability.pending, (state) => {
      state.success = true;
      state.loading = true;
      state.insertQuestiontoCapabilitySuccess = false;
    });
    builder.addCase(insertQuestionToCapability.fulfilled, (state) => {
      state.insertQuestiontoCapabilitySuccess = true;
      state.loading = false;
    });
    builder.addCase(insertQuestionToCapability.rejected, (state) => {
      state.error = true;
      state.loading = false;
      state.insertQuestiontoCapabilitySuccess = false;
    });
    builder.addCase(removeQuestionToCapability.pending, (state) => {
      state.loading = true;
      state.removeQuestionToCapabilitySuccess = false;
    });
    builder.addCase(removeQuestionToCapability.fulfilled, (state) => {
      state.removeQuestionToCapabilitySuccess = true;
      state.loading = false;
    });
    builder.addCase(removeQuestionToCapability.rejected, (state) => {
      state.error = true;
      state.loading = false;
      state.removeQuestionToCapabilitySuccess = false;
    });
  },
});

export const {
  reset,
  setCategorySuccess,
  setCapabilityState,
  setInitialCapability,
  updateSelectedCategory,
  handleOpenAddEditCategory,
  updateCategoryOverview,
  updateSelectedSubCategory,
} = addOrEditCapabilitySlice.actions;

export default addOrEditCapabilitySlice.reducer;
