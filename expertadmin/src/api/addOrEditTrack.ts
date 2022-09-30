import { post } from 'api';
import { post as configPost } from 'api/configApi';
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
import { API, CONFIGTYPES } from 'utils/constants';

const getTrackDetails = (payload: GetTrackDetailsRequest) => {
  return post(API.GETTRACKDETAILS, payload);
};

const createTrack = (payload: CreateTrackRequest) => {
  return post(API.CREATETRACK, payload);
};

const editSampleSolution = (payload: UpdateTrackRequest) => {
  return post(API.UPDATETRACK, payload);
};

const fetchEnums = (payload: GetEnumsRequest) => {
  return post(API.GETENUMS, payload);
};

const getAllExperts = (payload: GetExpertsRequest) => {
  return post(API.GETEXPERTS, payload);
};

const getAllMarkets = (payload: ExpertId) => {
  return post(API.GETMARKETS, payload);
};
const setTrackComplete = (payload: ExpertId & TrackId & UpdatedBy) => {
  return post(API.SETTRACKCOMPLETE, payload);
};

const getTrackTree = (payload: ExpertId & TrackId) => {
  return post(API.GETTRACKTREE, payload);
};

const createTrackTree = (payload: CreateTreeRequest) => {
  return post(API.CREATETRACKTREE, payload);
};

const validateTrack = (payload: TrackId & ExpertId) => {
  return post(API.VALIDATETRACK, payload);
};

const getTrackSummary = (payload: TrackId & ExpertId) => {
  return post(API.GETTRACKSUMMARY, payload);
};

const updateTrackHierarchy = (payload: TrackId & ExpertId) => {
  return post(API.UPDATETRACKHIERARCHY, payload);
};

const getQuestionsFromCapability = (payload: ExpertId & CapabilityId) => {
  return post(API.GETQUESTIONSFROMCAPABILITY, payload);
};

const addQuestionsToCapability = (payload: AddQuestionsToCapabilityRequest) => {
  return post(API.ADDQUESTIONSTOCAPABILITY, payload);
};

const getSubcategoryByCategoryId = (payload: ExpertId & CategoryId) => {
  return post(API.GETSUBCATEGORYLISTBYCATEGORYID, payload);
};

const getTrackTags = (expertId: string) => {
  return configPost(API.GETCONFIG, { expertId, type: CONFIGTYPES.TRACKTAGS });
};

export const addOrEditTrack = {
  getTrackTags,
  getTrackDetails,
  createTrack,
  editSampleSolution,
  fetchEnums,
  getAllExperts,
  getAllMarkets,
  setTrackComplete,
  getTrackTree,
  createTrackTree,
  validateTrack,
  getTrackSummary,
  updateTrackHierarchy,
  getQuestionsFromCapability,
  addQuestionsToCapability,
  getSubcategoryByCategoryId,
};
