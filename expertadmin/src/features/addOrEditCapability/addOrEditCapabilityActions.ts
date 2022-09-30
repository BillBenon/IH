import { createAsyncThunk } from '@reduxjs/toolkit';
import { addOrEditCapability } from 'api/addOrEditCapability';
import { capability } from 'api/capability';
import {
  AddCapabilityRequest,
  AddEvaluationToQuestionRequest,
  CapabilityId,
  CategoryId,
  CreateCategoryRequest,
  CreateSubCategoryRequest,
  ExpertId,
  GetCapabilityDetailRequest,
  QuestionId,
  SubCategoryId,
  UpdateCapabilityRequest,
  UpdateCategoryRequest,
  UpdatedBy,
  UpdateSubCategoryRequest,
} from 'types';

const {
  setCapabilityComplete,
  getCapabilitiesDetail,
  editCapability,
  createCapability,
  createCategory,
  updateCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getCategoryDetails,
  getSubCategoryDetails,
  getCategoryTree,
  addEvaluationToQuestion,
  addQuestionToCapability,
  deleteQuestionToCapability,
  deleteCategory,
} = addOrEditCapability;

export const getCapabilityDetails = createAsyncThunk(
  `addOrEditCapability/getCapabilityDetails`,
  async (getCapabilityRequest: GetCapabilityDetailRequest) => {
    const response = await getCapabilitiesDetail(getCapabilityRequest);
    return response;
  }
);

export const updateCapability = createAsyncThunk(
  `addOrEditCapability/updateCapability`,
  async (updateRequest: UpdateCapabilityRequest) => {
    const response = await editCapability(updateRequest);
    return response;
  }
);

export const addCapability = createAsyncThunk(
  `addOrEditCapability/addCapability`,
  async (addCapability: AddCapabilityRequest) => {
    const response = await createCapability(addCapability);
    return response;
  }
);

export const completeCapability = createAsyncThunk(
  `addOrEditCapability/completeCapability`,
  async (data: ExpertId & CapabilityId & UpdatedBy) => {
    const response = await setCapabilityComplete(data);
    return response;
  }
);

export const getCategoriesAndSubcategories = createAsyncThunk(
  `capability/getCategoriesAndSubcategories`,
  async (getCategoriesRequest: ExpertId) => {
    const response = await capability.getCategoriesAndSubcategories(
      getCategoriesRequest
    );
    return response;
  }
);

export const addCategory = createAsyncThunk(
  `capability/createCategory`,
  async (createCategoryRequest: CreateCategoryRequest) => {
    const response = await createCategory(createCategoryRequest);
    return response;
  }
);

export const editCategory = createAsyncThunk(
  `capability/updateCategory`,
  async (updateCategoryRequest: UpdateCategoryRequest) => {
    const response = await updateCategory(updateCategoryRequest);
    return response;
  }
);

export const addSubCategory = createAsyncThunk(
  `capability/createSubCategory`,
  async (createSubCategoryRequest: CreateSubCategoryRequest) => {
    const response = await createSubCategory(createSubCategoryRequest);
    return response;
  }
);

export const editSubCategory = createAsyncThunk(
  `capability/updateSubCategory`,
  async (updateSubCategoryRequest: UpdateSubCategoryRequest) => {
    const response = await updateSubCategory(updateSubCategoryRequest);
    return response;
  }
);

export const removeCategory = createAsyncThunk(
  `capability/removeCategory`,
  async (updateCategoryRequest: CategoryId & ExpertId) => {
    const response = await deleteCategory(updateCategoryRequest);
    return response;
  }
);

export const removeSubCategory = createAsyncThunk(
  `capability/removeSubCategory`,
  async (updateSubCategoryRequest: SubCategoryId & ExpertId) => {
    const response = await deleteSubCategory(updateSubCategoryRequest);
    return response;
  }
);

export const fetchCategory = createAsyncThunk(
  `capability/fetchCategory`,
  async (data: CategoryId & ExpertId) => {
    const response = await getCategoryDetails(data);
    return response;
  }
);

export const fetchSubCategory = createAsyncThunk(
  `capability/fetchSubCategory`,
  async (data: SubCategoryId & ExpertId) => {
    const response = await getSubCategoryDetails(data);
    return response;
  }
);

export const fetchCategoryTree = createAsyncThunk(
  `capability/fetchCategoryTree`,
  async (data: ExpertId & CategoryId) => {
    const response = await getCategoryTree(data);
    return response;
  }
);

export const attachEvaluationToQuestion = createAsyncThunk(
  `capability/addEvaluationToQuestion`,
  async (data: AddEvaluationToQuestionRequest) => {
    const response = await addEvaluationToQuestion(data);
    return response;
  }
);

export const insertQuestionToCapability = createAsyncThunk(
  `capability/insertQuestionToCapability`,
  async (data: ExpertId & CapabilityId & QuestionId) => {
    const response = await addQuestionToCapability(data);
    return response;
  }
);

export const removeQuestionToCapability = createAsyncThunk(
  `capability/removeQuestionToCapability`,
  async (data: ExpertId & CapabilityId & QuestionId) => {
    const response = await deleteQuestionToCapability(data);
    return response;
  }
);
