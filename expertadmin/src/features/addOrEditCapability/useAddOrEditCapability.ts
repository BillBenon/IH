import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  CapabilityId,
  CategoryTree,
  EvaluationCapability,
  GetCapabilityResponse,
  QuestionId,
  TitleDescription,
} from 'types';
import BrowserStorage from 'utils/broswer-storage';
import { isNumeric } from 'utils/commonutils';
import { Market, MenuItems } from 'utils/constants';

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
  removeSubCategory,
  updateCapability,
  removeQuestionToCapability,
} from './addOrEditCapabilityActions';
import {
  reset,
  handleOpenAddEditCategory,
  setCapabilityState,
  setInitialCapability,
  updateCategoryOverview,
  updateSelectedCategory,
  updateSelectedSubCategory,
  setCategorySuccess,
} from './addOrEditCapabilitySlice';

export const useAddOrEditCapability = () => {
  const params: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const expert = useSelector((state: RootState) => state.auth.expert);
  const {
    capability,
    loading,
    saveSuccess,
    categorySubcategoryList,
    categorysuccess,
    selectedCategory,
    selectedSubCategory,
    categoryDetail,
    subCategoryDetail,
    categoryOverviewTree,
    attachEvaluationSuccess,
    insertQuestiontoCapabilitySuccess,
    removeQuestionToCapabilitySuccess,
    categorysubCategoryLoading,
    openAddEditCategory,
  } = useSelector((state: RootState) => state.addOrEditCapability);
  const { capabilityId } = capability;
  const { expertId } = expert!;
  //const market = Market.INTERVIEWHELP;

  const fetCapabilityDetails = async (paramId: string) => {
    if (paramId) {
      if (!isNumeric(paramId)) {
        const capabilityId = paramId;
        dispatch(getCapabilityDetails({ capabilityId, expertId }));
      } else {
        const values = await BrowserStorage.getItem(MenuItems.capabilities);
        const inx =
          values && values?.findIndex((val: any) => val.param === paramId);
        if (inx != undefined && inx != -1 && values[inx]?.data) {
          dispatch(setInitialCapability(values[inx].data));
        } else {
          dispatch(setInitialCapability());
        }
      }
    }
  };

  const saveCapabilityDetails = (
    data: GetCapabilityResponse,
    capId?: string
  ) => {
    if (!data.categoryId) data.categoryId = selectedCategory;
    if (!data.subCategoryId) data.subCategoryId = selectedSubCategory;
    data.market = Market.INTERVIEWHELP;
    data.trackType = 'TPM';
    if (!isNumeric(capId ?? params.id))
      dispatch(
        updateCapability({
          ...data,
          expertId,
          updatedBy: expertId,
          capabilityId,
        })
      );
    else dispatch(addCapability({ ...data, expertId, createdBy: expertId }));
  };

  const publishCapabilityDetails = () => {
    dispatch(
      completeCapability({
        expertId,
        capabilityId: capabilityId || params.id,
        updatedBy: expertId,
      })
    );
  };

  const updateCapabilityState = (state: string) => {
    dispatch(setCapabilityState(state));
  };

  const getAllCategoriesAndSubCategories = () => {
    dispatch(getCategoriesAndSubcategories({ expertId }));
  };

  const createCategory = (data: TitleDescription) => {
    dispatch(addCategory({ ...data, expertId, createdBy: expertId }));
  };

  const updateCategory = (data: TitleDescription & { categoryId: string }) => {
    dispatch(editCategory({ ...data, expertId, updatedBy: expertId }));
  };

  const createSubCategory = (
    data: TitleDescription & { categoryId: string }
  ) => {
    dispatch(
      addSubCategory({
        ...data,
        expertId,
        createdBy: expertId,
        categoryId: selectedCategory ? selectedCategory : data.categoryId,
      })
    );
  };

  const updateSubCategory = (
    data: TitleDescription & {
      categoryId?: string;
      subCategoryId: string;
    }
  ) => {
    if (!data.categoryId) data.categoryId = selectedCategory;
    dispatch(
      editSubCategory({
        ...data,
        expertId,
        updatedBy: expertId,
        categoryId: data.categoryId,
      })
    );
  };

  const setSelectedCategory = (id: string) => {
    dispatch(updateSelectedCategory(id));
  };

  const setSelectedSubCategory = (id: string) => {
    dispatch(updateSelectedSubCategory(id));
  };

  const deleteCategory = (categoryId: string) => {
    dispatch(removeCategory({ categoryId, expertId }));
  };

  const deleteSubCategory = (subCategoryId: string) => {
    dispatch(removeSubCategory({ subCategoryId, expertId }));
  };

  const setOpenAddEditCategory = (payload: boolean) => {
    dispatch(handleOpenAddEditCategory(payload));
  };

  const getCategory = (categoryId: string) => {
    dispatch(fetchCategory({ categoryId, expertId }));
  };

  const getSubCategory = (subCategoryId: string) => {
    dispatch(fetchSubCategory({ subCategoryId, expertId }));
  };

  const getCategoryTree = (categoryId: string) => {
    dispatch(fetchCategoryTree({ categoryId, expertId }));
  };

  const updateOverview = (overview?: CategoryTree) => {
    dispatch(updateCategoryOverview(overview));
  };

  const attachEvaluation = (
    data: EvaluationCapability[],
    questionId: string
  ) => {
    const request = { evaluations: data, questionId, expertId };
    dispatch(attachEvaluationToQuestion(request));
  };

  const addQuestionToCapability = (data: QuestionId & CapabilityId) => {
    dispatch(insertQuestionToCapability({ ...data, expertId }));
  };

  const deleteQuestionToCapability = (data: QuestionId & CapabilityId) => {
    dispatch(removeQuestionToCapability({ ...data, expertId }));
  };

  const resetCategorySuccess = () => {
    dispatch(setCategorySuccess());
  };

  const initializeAddOrEditCapability = () => {
    dispatch(reset());
  };

  return {
    getAllCategoriesAndSubCategories,
    publishCapabilityDetails,
    saveCapabilityDetails,
    fetCapabilityDetails,
    updateCapabilityState,
    createCategory,
    updateCategory,
    createSubCategory,
    updateSubCategory,
    setSelectedCategory,
    setSelectedSubCategory,
    deleteCategory,
    deleteSubCategory,
    setOpenAddEditCategory,
    getCategory,
    getSubCategory,
    getCategoryTree,
    updateOverview,
    attachEvaluation,
    addQuestionToCapability,
    deleteQuestionToCapability,
    resetCategorySuccess,
    initializeAddOrEditCapability,
    categorySubcategoryList,
    params,
    capability,
    loading,
    saveSuccess,
    categorysuccess,
    selectedCategory,
    selectedSubCategory,
    openAddEditCategory,
    categoryDetail,
    subCategoryDetail,
    categoryOverviewTree,
    attachEvaluationSuccess,
    insertQuestiontoCapabilitySuccess,
    removeQuestionToCapabilitySuccess,
    categorysubCategoryLoading,
  };
};
