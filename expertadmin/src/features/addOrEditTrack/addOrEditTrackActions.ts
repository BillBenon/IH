import { createAsyncThunk } from '@reduxjs/toolkit';
import { addOrEditTrack } from 'api/addOrEditTrack';
import {
  AddQuestionsToCapabilityRequest,
  CapabilityId,
  CategoryId,
  CreateTrackRequest,
  CreateTreeRequest,
  ExpertId,
  GetEnumsRequest,
  GetExpertsRequest,
  GetTrackDetailsRequest,
  TrackId,
  UpdatedBy,
  UpdateTrackRequest,
} from 'types';

const {
  getTrackTags,
  getTrackDetails,
  createTrack,
  editSampleSolution,
  fetchEnums,
  getAllExperts,
  getAllMarkets,
  getTrackTree,
  createTrackTree,
  getQuestionsFromCapability,
  addQuestionsToCapability,
  getTrackSummary,
  updateTrackHierarchy,
  validateTrack,
  setTrackComplete,
  getSubcategoryByCategoryId,
} = addOrEditTrack;

export const fetchTrackDetails = createAsyncThunk(
  `addOrEditTrack/fetchTrackDetails`,
  async (data: GetTrackDetailsRequest) => {
    const response = await getTrackDetails(data);
    return response;
  }
);

export const editTrack = createAsyncThunk(
  `addOrEditTrack/editTrack`,
  async (data: UpdateTrackRequest) => {
    const response = await editSampleSolution(data);
    return response;
  }
);

export const addTrack = createAsyncThunk(
  `addOrEditTrack/addTrack`,
  async (data: CreateTrackRequest) => {
    const response = await createTrack(data);
    return response;
  }
);

export const getEnums = createAsyncThunk(
  `addOrEditTrack/getEnums`,
  async (data: GetEnumsRequest) => {
    const response = await fetchEnums(data);
    return response;
  }
);

export const getExperts = createAsyncThunk(
  `addOrEditTrack/getExperts`,
  async (data: GetExpertsRequest) => {
    const response = await getAllExperts(data);
    return response;
  }
);

export const getMarkets = createAsyncThunk(
  `addOrEditTrack/getMarkets`,
  async (data: ExpertId) => {
    const response = await getAllMarkets(data);
    return response;
  }
);

export const updateTrackComplete = createAsyncThunk(
  `addOrEditTrack/updateTrackComplete`,
  async (data: ExpertId & TrackId & UpdatedBy) => {
    const response = await setTrackComplete(data);
    return response;
  }
);

export const getTrackTreeData = createAsyncThunk(
  `addOrEditTrack/getTrackTreeData`,
  async (data: ExpertId & TrackId) => {
    const response = await getTrackTree(data);
    return response;
  }
);

export const insertTrackTree = createAsyncThunk(
  `addOrEditTrack/insertTrackTree`,
  async (data: CreateTreeRequest) => {
    const response = await createTrackTree(data);
    return response;
  }
);

export const fetchQuestionsFromCapability = createAsyncThunk(
  `addOrEditTrack/fetchQuestionsFromCapability`,
  async (data: ExpertId & CapabilityId) => {
    const response = await getQuestionsFromCapability(data);
    return response;
  }
);

export const addCapabilityQuestions = createAsyncThunk(
  `addOrEditTrack/addCapabilityQuestions`,
  async (data: AddQuestionsToCapabilityRequest) => {
    const response = await addQuestionsToCapability(data);
    return response;
  }
);

export const fetchTrackSummary = createAsyncThunk(
  `addOrEditTrack/fetchTrackSummary`,
  async (data: TrackId & ExpertId) => {
    const response = await getTrackSummary(data);
    return response;
  }
);

export const checkAndUpdateTrackHierarchy = createAsyncThunk(
  `addOrEditTrack/checkAndUpdateTrackHierarchy`,
  async (data: TrackId & ExpertId) => {
    const response = await updateTrackHierarchy(data);
    return response;
  }
);

export const checkAndValidateTrack = createAsyncThunk(
  `addOrEditTrack/checkAndValidateTrack`,
  async (data: TrackId & ExpertId) => {
    const response = await validateTrack(data);
    return response;
  }
);

export const fetchSubcategoryByCategoryId = createAsyncThunk(
  `addOrEditTrack/getSubcategoryByCategoryId`,
  async (data: ExpertId & CategoryId) => {
    const response = await getSubcategoryByCategoryId(data);
    return response;
  }
);

export const fetchTrackTags = createAsyncThunk(
  `addOrEditTrack/getTrackTags`,
  async (expertId: string) => {
    const response = await getTrackTags(expertId);
    return response;
  }
);
