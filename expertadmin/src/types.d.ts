export type ExpertId = {
  expertId: string;
};

export type Market = {
  market: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export type QuestionId = {
  questionId: string;
};

export type CapabilityId = {
  capabilityId: string;
};

export type CategoryId = {
  categoryId: string;
};

export type SubCategoryId = {
  subCategoryId: string;
};

export type Flag = {
  flags?: Flags;
};

export type PaginationFilters = {
  count?: number;
  skipCount: number;
};

export type CreatedBy = {
  createdBy: string;
};

export type UpdatedBy = {
  updatedBy: string;
};

export type ApiException = {
  apiMessage: string;
  apiStatus: string;
};

export type Expert = ExpertId & {
  fullname: string;
  email: string;
  roleType: string;
};

export type Flags = {
  case_sensitive: boolean;
  exact_match: boolean;
};

export type TrackId = {
  trackId: string;
};

export type GetResultForQuestionRequest = ExpertId &
  PaginationFilters &
  Flag &
  Filter & {
    updatedDateTo: string;
    capabilityId?: string;
  };

export type Filter = {
  textToSearch: string;
  searchInTitle: boolean;
  searchInDescription: boolean;
  updatedDateFrom: string;
};

export type CapabilityFilter = Filter &
  CategoryId & {
    subCategoryId: string;
    subcategoryCheck?: boolean;
  };

export type SampleSolution = {
  title: string;
  description: string;
  hints: string[];
  id: string;
};

export type Capability = CapabilityId & {
  capabilityName: string;
  capabilityText?: string;
  evaluationIds: string[];
  order: number;
};

export type CandidateTrack = {
  trackId: string;
  title: string;
  trackType: string;
  candidateTrackId: string;
  plan: string
};

export type Candidates = {
  candidateId: string;
  candidateName?: string;
  candidateEmail: string[];
  tracks: CandidateTrack[];
};

export type GetCandidateRequest = {
  interactionTypes: string[];
  expertId: string;
};

export type GetCandidateDetailRequest = {
  candidateId: string;
  trackId: string;
};

export type GetCandidateAuthorizationTokenRequest = {
  expertId: string,
  candidateId: string,
}

export type Question = QuestionId &
  CreatedBy & {
    title: string;
    description: string;
    questionHint: QuestionHint[];
    sampleSolutions: SampleSolution[];
    capabilities: Capability[];
    updatedAt: string;
    state: string;
    answerType: string;
    questionType: string;
  };

export type SelectedQuestion = Question & {
  nextQuestion?: string;
  nextQuestionId?: string;
  prevQuestionId?: string;
};

export type QuestionHint = {
  id: string;
  title?: string;
  description: string;
};

export type AddOrEditQuestionResponse = ExpertId &
  QuestionId &
  Market &
  CreatedBy & {
    title: string;
    description: string;
    questionType: string;
    answerType: string;
    state: string;
    hints: QuestionHint[];
    sampleSolutions: SampleSolution[];
    disabled: boolean;
    disableReason: string;
    capabilities: Capability[];
    level: string;
  };

export type AddOrEditQuestionRequest = ExpertId &
  CreatedBy & {
    title: string;
    description: string;
    questionType: string;
    answerType: string;
    disabled: boolean;
    disableReason: string;
    hintIds: string[];
    level: string;
    solutionIds: string[];
  };

export type UpdateRequest = AddOrEditQuestionRequest & QuestionId & UpdatedBy;

export type AddRequest = AddOrEditQuestionRequest & Market;

export type GetQuestionDetailRequest = ExpertId & QuestionId;

export type AddHintRequest = ExpertId & {
  createdBy: string;
};

export type UpdateHintRequest = ExpertId &
  UpdatedBy & {
    title: string;
    description: string;
    hintId: string;
  };

export type DeleteHintRequest = ExpertId & {
  hintIds: string[];
};

export type GetHintsRequest = ExpertId &
  PaginationFilters &
  Flag & {
    hintSearch: string;
  };

export type GetAllHintResponse = CreatedBy &
  UpdatedBy & {
    id: string;
    title: string;
    createdAt: string;
    description: string;
    expertId: string;
    updatedAt: string;
  };

export type AddOrEditSampleSolution = ExpertId & {
  title: string;
  description: string;
  hints: string[];
};

export type AddSampleSolutionRequest = AddOrEditSampleSolution & CreatedBy;

export type UpdateSampleSolutionRequest = AddOrEditSampleSolution &
  UpdatedBy & {
    sampleSolutionId: string;
  };

export type RecentItem = {
  [string]: { name: string; param: string };
};

export type GetCapabilitiesRequest = ExpertId &
  Flag &
  PaginationFilters &
  Filter &
  CategoryId & {
    subCategoryId: string;
    updatedDateTo: string;
    subcategoryCheck?: boolean;
  };

export type EmailStatusPagination = {
  skipCount: number;
  count: number
}

export type Evaluation = {
  id: string;
  evalText: string;
  hint: string;
  level: number;
  point: number;
  order: number;
};

export type GetCapabilitiesResponse = CapabilityId & {
  capabilityText: string;
  description: string;
  category: string;
  subcategory: string;
  trackType: string;
  order: number;
  weight: number;
  evaluations: Evaluation[];
  createdBy: string;
  createdDate: Date;
  updatedDate: Date;
  totalQuestion: number;
  state: string;
  questions: CapabilityQuestions[];
};

export type GetAllCategoriesAndSubCategoriesResponse = CategoryId & {
  title: string;
  subCategories: SubCategory[];
};
export type SubCategory = {
  subCategoryId: string;
  title: string;
  categoryId?: string;
  description?: string;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
};

export type GetCapabilityResponse = CapabilityId &
  UpdatedBy &
  Market &
  CategoryId & {
    capabilityText: string;
    description: string;
    subCategoryId: string;
    trackType: string;
    order: number;
    weight: number;
    evaluations: OutputEvaluation[];
    createdDate: string;
    updatedDate: string;
    state: string;
    createdBy: string;
    questions: CapabilityQuestion[];
    disabled: boolean;
    disableReason: string;
  };

export type AddOrEditCapabilityRequest = ExpertId &
  CreatedBy &
  Market &
  CategoryId & {
    expertId: string;
    capabilityText: string;
    description: string;
    subCategoryId: string;
    trackType: string;
    order: number;
    weight: number;
    evaluations: OutputEvaluation[];
  };

export type GetCapabilityDetailRequest = ExpertId & CapabilityId;

export type UpdateCapabilityRequest = AddOrEditCapabilityRequest &
  CapabilityId &
  UpdatedBy;

export type AddCapabilityRequest = AddOrEditCapabilityRequest;

export type QuestionEvaluation = {
  evaluationId: string;
  evalText: string;
};

export type CapabilityQuestion = {
  questionId: string;
  title: string;
  evaluations: QuestionEvaluation[];
};

export type OutputEvaluation = {
  id: string;
  evalText: string;
  hint: string;
  level: number;
  point: number;
  order: number;
};

export type TitleDescription = {
  title: string;
  description: string;
};

export type CreateCategoryRequest = ExpertId & CreatedBy & TitleDescription;

export type UpdateCategoryRequest = ExpertId &
  UpdatedBy &
  TitleDescription &
  CategoryId;

export type CreateSubCategoryRequest = ExpertId &
  CreatedBy &
  TitleDescription &
  CategoryId;

export type UpdateSubCategoryRequest = ExpertId &
  UpdatedBy &
  TitleDescription &
  CategoryId &
  SubCategoryId;

export type CategoryTree = CategoryId &
  TitleDescription & {
    capabilities: CapabilityTree[];
    subcategories: SubcategoryTree[];
  };

export type ExpertTree = {
  experts: ExpertAllDetail[];
};

export type SubcategoryTree = TitleDescription & {
  subCategoryId: string;
  capabilities: CapabilityTree[];
};

export type CapabilityTree = {
  capabilityId: string;
  capabilityText: string;
  description: string;
};

export type CapabilityQuestionsType = {
  questionId: string;
  title: string;
  evaluations: CapabilityQuestionEval[];
};

export type CapabilityQuestionEval = {
  evaluationId: stirng;
  evalText: string;
  hint: string;
};

export type AddEvaluationToQuestionRequest = ExpertId &
  QuestionId & {
    evaluations: EvaluationCapability[];
  };

export type EvaluationCapability = CapabilityId & {
  evaluationIds: string[];
};

export type SetEntityStateRequest = ExpertId &
  UpdatedBy & {
    entities: Entity[];
  };

export type Entity = {
  type: string;
  id: string;
  disableReason?: string;
  isDisabled: boolean;
};

export type Track = TrackId &
  Market & {
    title: string;
    description: string;
    detailsDescription: string;
    trackType: string;
    trackSubType: string;
    logo: string;
    capabilityIds: string[];
    state: string;
    expertIds: ExpertDetail[];
    createdBy: string;
    createdDate: string;
    updatedDate: string;
    videos: TrackVideo[];
  };

export type GetResultForTrackRequest = ExpertId &
  PaginationFilters &
  Flag &
  TrackFilter;

export type GetResultForTrackSettingsRequest = ExpertId &
  PaginationFilters &
  Flag &
  TrackSettingsFilter;

export type TrackSettingsFilter = {
  textToSearch: string;
  description: string;
  detailsDescription: string;
};

export type TrackFilter = {
  title: string;
  description: string;
  detailsDescription: string;
};

export type ExpertDetail = ExpertId & {
  fullname: string;
  logo: string;
};

export type TrackRequest = {
  title: string;
  description: string;
  detailsDescription: string;
  trackType: string;
  trackSubType: string;
  logo?: string;
  expertIds: string[];
  disabled: boolean;
  state: string;
  videos: TrackVideo[];
};

export type TrackResponse = {
  title: string;
  description: string;
  detailsDescription: string;
  trackType: string;
  trackEnrollType: string;
  trackSubType: string;
  logo?: string;
  expertIds: TrackExpert[];
  disabled: boolean;
  state: string;
  disableReason: string;
  tags: any[];
  videos: TrackVideo[];
};

export type CreateTrackRequest = ExpertId & Market & TrackRequest & CreatedBy;

export type UpdateTrackRequest = ExpertId &
  Market &
  UpdatedBy &
  TrackId &
  TrackRequest;

export type GetTrackDetailsRequest = ExpertId & TrackId;

export type TrackDetails = TrackId & TrackResponse;

export type LabelValueType<T> = {
  label: string;
  value: T;
};

export type GetEnumsRequest = ExpertId & {
  types: string[];
};

export type ValueDescription = {
  value: string;
  description: string;
};

export type GetExpertsRequest = ExpertId &
  PaginationFilters &
  Flag & {
    textToSearch: string;
  };

export type GetAllExpertResponse = {
  count: number;
  experts: ExpertAllDetail[];
};

export type ExpertAllDetail = {
  expertId: string;
  fullname: string;
  email?: string;
  roleType: string;
  accessLevels?: string[];
  photoURL: string;
  workingAt: string;
  domain?: string;
  profile?: string;
};

export type TrackExpert = {
  expertId: string;
  fullname: string;
  roleType: string;
  photoURL: string;
  workingAt: string;
};

export type MarketDetail = {
  marketId: string;
  name: string;
  textId: string;
};

export type CreateTreeRequest = ExpertId &
  TrackId &
  UpdatedBy & {
    isLocked?: boolean;
    overview?: string;
    trackName: string;
    notes?: string;
    categories?: TrackCategoryTree[];
  };

export type TrackCategoryTree = CategoryId & {
  entity: string;
  categoryName: string;
  capabilities: TrackCapabilityTree[];
  subCategories: TrackSubCategoryTree[];
};

export type TrackSubCategoryTree = SubCategoryId & {
  entity: string;
  subCategoryName: string;
  capabilities: TrackCapabilityTree[];
};

export type TrackCapabilityTree = CapabilityId & {
  entity: string;
  capabilityText: string;
  questions: TrackQuestion[];
};

export type TrackQuestion = QuestionId & {
  entity: string;
  title: string;
  isFree: boolean;
};

export type AddQuestionsToCapabilityRequest = ExpertId &
  CapabilityId & {
    questionIds: string[];
  };

export type TrackSummary = {
  trackId: string;
  title: string;
  description: string;
  totalCapability: number;
  totalQuestion: number;
  state?: string;
};

export type CallBackFunctionType = {
  callback?: Function;
};

export type TrackErrors = {
  id: string;
  entity: string;
  name: string;
  errorMessage: string[];
};

export interface Title {
  visible: boolean;
  value: string;
}

export interface Description {
  visible: boolean;
  value: string;
}

export interface Logo {
  visible: boolean;
  value: string;
}

export interface Value {
  capabilityId: string;
  capabilityText: string;
  capabilityDescription: string;
  visible: boolean;
}

export interface Capabilities {
  visible: boolean;
  values: Value[];
}

export interface ProductId {
  visible: boolean;
  value: string;
}

export interface Description2 {
  visible: boolean;
  value: string;
}

export interface Name {
  visible: boolean;
  value: string;
}

export interface DisplayName {
  visible: boolean;
  value: string;
}

export interface Value2 {
  value: string;
  visible: boolean;
}

export interface DisplayDescription {
  visible: boolean;
  values: Value2[];
}

export interface ProductInfo {
  productId: ProductId;
  description: Description2;
  name: Name;
  displayName: DisplayName;
  displayDescription: DisplayDescription;
}

export interface KeyPoints {
  visible: boolean;
  values: string[];
}

export interface Value3 {
  question: string;
  answer: string;
  visible: boolean;
}

export interface Faqs {
  visible: boolean;
  values: Value3[];
}

export interface Value4 {
  name: string;
  profile: string;
  description: string;
  videoURL: string;
  visible: boolean;
}

export interface SuccessStories {
  visible: boolean;
  values: Value4[];
}

export interface Value5 {
  logo: string;
  title: string;
  url: string;
  visible: boolean;
}

export interface FreeBies {
  visible: boolean;
  values: Value5[];
}

export type UpdateTrackLandingPage = ExpertId &
  TrackId &
  TitleDescription & {
    trackLandingPageId: string;
    logo: Logo;
    capabilities: Capabilities;
    productInfo: ProductInfo[];
    keyPoints: KeyPoints;
    faqs: Faqs;
    successStories: SuccessStories;
    freeBies: FreeBies;
  };
export type GetResultsForExpertSearchReq = {
  loginExpertId: string;
  fullname: string;
  email: string;
  roleType: string;
  expertCategory: string;
} & PaginationFilters &
  Flags;

export type CreateExpertRequest = {
  fullname: string;
  email: string;
  password: string;
  roleType: string;
  accessLevels: string /* All*/[];
  expertCategory?: string;
  photoURL?: string;
  workingAt?: string;
  profile?: string;
  reviews?: Review[];
  loginExpertId: string;
};

export type UpdateCandidatePlan = {
  candidateTrackId: string;
  candidateId: string;
  trackId: string;
}

export type UpdateExpertRequest = {
  loginExpertId: string;
  expertId: string;
  fullname: string;
  email: string;
  password: string;
  roleType: string;
  accessLevels: string /* All */[];
  expertCategory?: string;
  photoURL?: string;
  workingAt?: string;
  profile?: string;
  reviews: Array<Review>;
};

export type GetExpertDetailRequest = {
  loginExpertId: string;
  expertId: string;
};

export type GetExpertResponse = {
  expertId: string;
  fullname: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
  roleType: string;
  expertCategory: string;
  photoURL: string;
  workingAt: string;
  profile: string;
  reviews: Review[];
  calendlyURL: string;
  accessLevels: string[];
  zoomId: string;
  state: string;
  disabled: boolean;
  disableReason: string;
};

export type Review = {
  date: string;
  reviewBy: string;
  comment: string;
};

export type RefreshInput = TrackId &
  ExpertId & {
    productDataRefresh: boolean;
    trackDataRefresh: boolean;
  };

export type Products = {
  id: string;
  planName: string;
  displayDescription: string;
  displayName: string;
};

export type ProductFilter = {
  offset: number;
  limit: number;
  productName: string;
  subProductType: string;
  productType: string;
};

export type ProductId = {
  productId: string;
};

export type GetProductsRequest = ProductId &
  ProductFilter &
  Flag & {
    textToSearch: string;
  };

export type GetProductResponse = ProductId & {
  name: string;
  description: string;
  price: number;
  recurringPriceType: string;
  market: string;
  track: [string];
  expert: string;
  recurringFrequency: number;
  displayName: string;
  displayDescription: string;
  productType: string;
  subProductType: string;
  canBuy: boolean;
  nextStep: string;
  order: string;
  productExpertId: string;
  planName: string;
  followUp: string;
  free: boolean;
  contractProduct: boolean;
  stripeProduct: boolean;
  subscriptionproduct: boolean;
  evaluation: boolean;
};

export type ProductRequest = {
  name: string;
  description: string;
  price: number;
  recurringPriceType: string;
  serviceType: string;
  serviceEntities: string;
  market: string;
  track: string;
  expert: string;
  recurringFrequency: number;
  displayName: string;
  displayDescription: string;
  productType: string;
  subProductType: string;
  canBuy: boolean;
  nextStep: string;
  order: string;
  productExpertId: string;
  planName: string;
  followUp: string;
  productCategory: string;
  isStripeProduct: boolean;
  evaluation: boolean;
  id: string;
  active: string;
  tags: string;
};

export type GetProductByIdRequest = {
  productId: string;
};

export type ProductRequest = {
  active: string;
  name: string;
  description: string;
  price: number;
  recurringPriceType: string;
  market: string;
  track: string;
  expert: string;
  recurringFrequency: number;
  displayName: string;
  displayDescription: string;
  productType: string;
  subProductType: string;
  canBuy: boolean;
  nextStep: string;
  order: string;
  productExpertId: string;
  planName: string;
  followUp: string;
  productCategory: string;
  isStripeProduct: boolean;
  evaluation: boolean;
  id: string;
  active: string;
  tags: string;
};

export type UpdateHistory = {
  CreatedBy: string;
  DateAndTime: string;
};

export type EditProductData = {
  id: string;
  images?: any;
  serviceType: string;
  serviceEntities: [];
  stripePriceID: string;
  price: number;
  productExpertId: string;
  updateHistory?: UpdateHistory[];
  description: string;
  name: string;
  unit_label?: any;
  updated?: any;
  expert: string;
  market: string;
  order: number;
  created: number;
  timestamp?: string;
  active: boolean | string;
  canBuy: boolean;
  livemode?: any;
  displayName: string;
  displayDescription: string;
  planName: string;
  followUp: string;
  nextStep: string;
  stripeProductId: string;
  tracks: TrackList[];
  productType?: string;
  subProductType?: string;
  meetingProductmetadataId?: any;
  recurringPriceType: string;
  recurringFrequency?: any;
  stripeProduct: boolean;
  subscriptionProduct: boolean;
  contractProduct: boolean;
  evaluationProduct: boolean;
  free: boolean;
  tags: [];
};

export type UpdateProductRequest = {
  id: string;
  name: string;
  description: string;
  serviceType: string;
  serviceEntities: string;
  displayDescription: string;
  displayName: string;
  planName: string;
  followUp: string;
  nextStep: string;
  track: string;
  active: boolean;
  tags: [];
};

export type UpdatePriceRequest = {
  subscriptionProduct: boolean;
  expertId: string | undefined;
  trackId: string;
  stripeProductId: string;
  productId: string;
  price: number;
  priceType: string; // month year
  interval: number;
};

export type TrackList = {
  label: string;
  value: string;
};
export type ExpertList = {
  label: string;
  value: string;
};

export type TagsList = {
  key: string;
  value: string;
};

export type ProductsExpertTrack = {
  trackId: string;
  productExpertId: string;
};

export type GetAllTracksEnrollType = {
  enrollType: string;
};

export type GetMeetings = {
  expertId: string;
  startDate: string;
  endDate: string;
};

export type expertMeetingData = {
  meetingTime: string;
  meetingTitle: string;
  meetingPurpose: string;
  candidateName: string;
};

export interface Schedule {
  dateAndTime: string;
  topic: string;
  description: string;
  duration: string;
  recordingURL: string;
  recordingPassword: string;
  expertId: string;
  zoomDetails: string;
}

export interface ClassInfo {
  id: string;
  productId: string;
  startDate: string;
  endDate: string;
  expertId: string;
  zoomDetails: string;
  schedule: Schedule[];
}

export interface ClassInfoRequest {
  id?: string;
  productId: string;
  timePeriod: string;
}

export interface TrackVideo {
  title: string;
  description: string;
  url: string;
  type: string;
}

export interface ProductTags {
  key: string;
  value: string[];
}

export interface S3CURDOPRATIONS {
  path: string,
  expertId: string
}

export interface SendEmail {
  "token"?: string,
  "expertId": string,
  "toEmailType": string,
  "trackId"?: string,
  "emailType": string,
  "toEmails"?: string[],
  "subject": string,
  "body": string,
  "pourpose": string
}