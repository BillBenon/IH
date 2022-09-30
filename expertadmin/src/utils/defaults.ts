import {
  AddOrEditQuestionResponse,
  EditProductData,
  Evaluation,
  expertMeetingData,
  GetCapabilitiesRequest,
  GetCandidateDetailRequest,
  UpdateCandidatePlan,
  GetCapabilityResponse,
  GetExpertResponse,
  GetResultForQuestionRequest,
  GetResultForTrackRequest,
  GetResultsForExpertSearchReq,
  ProductFilter,
  TrackDetails,
  GetResultForTrackSettingsRequest,
  ClassInfo,
  Schedule,
  TrackVideo,
  ProductTags
} from "types";

import {
  AnswerTypeEnum,
  DefaultPaginationCount,
  Market,
  QuestionTypeEnum,
  State,
} from "./constants";

export const initialQuestionFilter: GetResultForQuestionRequest = {
  expertId: "",
  textToSearch: "",
  searchInTitle: true,
  searchInDescription: true,
  updatedDateFrom: "",
  updatedDateTo: "",
  count: DefaultPaginationCount,
  skipCount: 0,
  flags: { case_sensitive: false, exact_match: false },
};

export const initialQuestion: AddOrEditQuestionResponse = {
  questionId: "",
  title: "",
  description: "",
  market: "",
  questionType: QuestionTypeEnum[0],
  answerType: AnswerTypeEnum[0],
  state: State.INPROGRESS,
  hints: [],
  sampleSolutions: [],
  disabled: false,
  disableReason: "",
  capabilities: [],
  level: "1",
  createdBy: "",
  expertId: "",
};

export const initialCandidateDetailFilter: GetCandidateDetailRequest = {
  candidateId: "",
  trackId: "",
};
export const initialUpdateCandidatePlan: UpdateCandidatePlan = {
  candidateTrackId: "",
  candidateId: "",
  trackId: ""
}

export const initialCapabilityFilter: GetCapabilitiesRequest = {
  expertId: "",
  textToSearch: "",
  searchInTitle: true,
  searchInDescription: true,
  categoryId: "",
  subCategoryId: "",
  updatedDateFrom: "",
  updatedDateTo: "",
  count: DefaultPaginationCount,
  skipCount: 0,
};

export const initialExpertFilter: GetResultsForExpertSearchReq = {
  loginExpertId: "",
  case_sensitive: false,
  email: "",
  exact_match: true,
  count: DefaultPaginationCount,
  skipCount: 0,
  expertCategory: "",
  fullname: "",
  roleType: "",
};

export const initialCapability: GetCapabilityResponse = {
  capabilityText: "",
  description: "",
  capabilityId: "",
  state: State.INPROGRESS,
  disabled: false,
  disableReason: "",
  createdBy: "",
  updatedBy: "",
  market: Market.INTERVIEWHELP,
  categoryId: "",
  subCategoryId: "",
  trackType: "",
  order: 1,
  weight: 0,
  evaluations: [],
  questions: [],
  createdDate: "",
  updatedDate: "",
};

export const initialExpert: GetExpertResponse = {
  expertId: "",
  fullname: "",
  email: "",
  password: "",
  roleType: "",
  accessLevels: ["ALL"],
  photoURL: "",
  profile: "",
  workingAt: "",
  zoomId: "",
  calendlyURL: "",
  expertCategory: "",
  reviews: [],
  disabled: false,
  disableReason: "",
  state: State.INPROGRESS,
};

export const initialEvaluation: Evaluation = {
  id: "",
  evalText: "",
  hint: "",
  level: 1,
  point: 1,
  order: 0,
};

export const initialTrackFilter: GetResultForTrackRequest = {
  title: "",
  description: "",
  detailsDescription: "",
  expertId: "",
  count: DefaultPaginationCount,
  skipCount: 0,
  flags: { case_sensitive: false, exact_match: false },
};

export const initialTrackSettingsFilter: GetResultForTrackSettingsRequest = {
  textToSearch: "",
  description: "",
  detailsDescription: "",
  expertId: "",
  count: DefaultPaginationCount,
  skipCount: 0,
  flags: { case_sensitive: false, exact_match: false },
};

export const initialEditData: EditProductData = {
  id: "",
  images: null,
  name: "",
  stripePriceID: "",
  price: 0,
  productExpertId: "",
  description: "",
  unit_label: "",
  updated: "",
  expert: "",
  market: Market.INTERVIEWHELP,
  order: 1,
  created: 0,
  active: "1",
  canBuy: false,
  livemode: null,
  displayName: "",
  displayDescription: "",
  planName: "",
  followUp: "",
  nextStep: "",
  stripeProductId: "",
  serviceType: "",
  serviceEntities: [],
  tracks: [],
  meetingProductmetadataId: null,
  stripeProduct: false,
  contractProduct: false,
  subscriptionProduct: false,
  free: true,
  evaluationProduct: false,
  recurringFrequency: 1,
  recurringPriceType: "none",
  tags: [],
}

export const initialTrack: TrackDetails = {
  trackId: "",
  title: "",
  description: "",
  detailsDescription: "",
  trackType: "",
  trackSubType: "",
  trackEnrollType: "CAN_ENROLL",
  logo: "",
  expertIds: [],
  disabled: false,
  state: State.INPROGRESS,
  disableReason: "",
  tags: [],
  videos: [],
};

export const initialProductFilter: ProductFilter = {
  offset: 0,
  limit: 10,
  productName: "",
  subProductType: "none",
  productType: "",
};

export const defaultMeetingData: expertMeetingData = {
  meetingTime: "",
  meetingTitle: "",
  meetingPurpose: "",
  candidateName: "",
};

export const defaultClassInfo: ClassInfo = {
  id: "",
  productId: "",
  startDate: "",
  endDate: "",
  expertId: "",
  zoomDetails: "",
  schedule: [],
};

export const defaultSchedule: Schedule = {
  dateAndTime: "",
  topic: "",
  description: "",
  duration: "",
  recordingURL: "",
  recordingPassword: "",
  expertId: "",
  zoomDetails: "",
};

export const defaultTrackVideoInfo: TrackVideo = {
  title: "",
  description: "",
  url: "",
  type: "",
};

export const defaultProductTagInfo: ProductTags = {
  key: "",
  value: []
};
