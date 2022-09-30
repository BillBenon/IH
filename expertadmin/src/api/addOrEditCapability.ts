import { post } from 'api';
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
import { API } from 'utils/constants';

const {
  GETCAPABILITYDETAIL,
  UPDATECAPABILITYDETAIL,
  ADDCAPABILITYDETAIL,
  SETCAPABILITYCOMPLETE,
  CREATECATEGORY,
  UPDATECATEGORY,
  CREATESUBCATEGORY,
  UPDATESUBCATEGORY,
  DELETECATEGORY,
  DELETESUBCATEGORY,
  GETCATEGORYTREE,
  GETCATEGORYDETAILS,
  GETSUBCATEGORYDETAILS,
  ADDQUESTIONTOCAPABILITY,
  REMOVEQUESTIONTOCAPABILITY,
  ADDQUESTIONEVALUATION,
} = API;

const getCapabilitiesDetail = (payload: GetCapabilityDetailRequest) => {
  return post(GETCAPABILITYDETAIL, payload);
};

const editCapability = (payload: UpdateCapabilityRequest) => {
  return post(UPDATECAPABILITYDETAIL, payload);
};

const createCapability = (payload: AddCapabilityRequest) => {
  return post(ADDCAPABILITYDETAIL, payload);
};

const setCapabilityComplete = (
  payload: ExpertId & CapabilityId & UpdatedBy
) => {
  return post(SETCAPABILITYCOMPLETE, payload);
};

const createCategory = (payload: CreateCategoryRequest) => {
  return post(CREATECATEGORY, payload);
};

const updateCategory = (payload: UpdateCategoryRequest) => {
  return post(UPDATECATEGORY, payload);
};

const createSubCategory = (payload: CreateSubCategoryRequest) => {
  return post(CREATESUBCATEGORY, payload);
};

const updateSubCategory = (payload: UpdateSubCategoryRequest) => {
  return post(UPDATESUBCATEGORY, payload);
};

const deleteCategory = (payload: CategoryId & ExpertId) => {
  return post(DELETECATEGORY, payload);
};

const deleteSubCategory = (payload: SubCategoryId & ExpertId) => {
  return post(DELETESUBCATEGORY, payload);
};

const getCategoryDetails = (payload: ExpertId & CategoryId) => {
  return post(GETCATEGORYDETAILS, payload);
};

const getSubCategoryDetails = (payload: ExpertId & SubCategoryId) => {
  return post(GETSUBCATEGORYDETAILS, payload);
};

const getCategoryTree = (payload: ExpertId & CategoryId) => {
  return post(GETCATEGORYTREE, payload);
};

const addEvaluationToQuestion = (payload: AddEvaluationToQuestionRequest) => {
  return post(ADDQUESTIONEVALUATION, payload);
};

const addQuestionToCapability = (
  payload: ExpertId & QuestionId & CapabilityId
) => {
  return post(ADDQUESTIONTOCAPABILITY, payload);
};

const deleteQuestionToCapability = (
  payload: ExpertId & QuestionId & CapabilityId
) => {
  return post(REMOVEQUESTIONTOCAPABILITY, payload);
};

export const addOrEditCapability = {
  setCapabilityComplete,
  getCapabilitiesDetail,
  getSubCategoryDetails,
  getCategoryDetails,
  createCapability,
  editCapability,
  createCategory,
  updateCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteCategory,
  getCategoryTree,
  addEvaluationToQuestion,
  addQuestionToCapability,
  deleteQuestionToCapability,
};
