export interface IGetMarketInfoRequest {
  token: string;
  market: string;
}

export interface ICreateNewCandidateForMarketRequest {
  token: string;
  marketId: string;
  fullname: string;
  email: string;
  password: string;
}

export interface ICreateCandidateTrackForCandidateRequest {
  token: string;
  candidateId: string;
  trackId: string;
}

export interface IGetDetailsForCandidatebyCandidateTrackIdRequest {
  token?: string;
  candidateTrackId: string;
}

export interface IGetDetailsForCandidatebyCandidateAndTrackIdRequest {
  token: string;
  candidateId: string;
  trackId: string;
}

export interface IGETLINKEDINACCESSTOKENREQUEST {
  token: string;
  grant_type: string;
  state: string;
  client_id: string;
  code: string;
  client_secret: string;
  redirect_uri: string;
  marketId: string;
}

export interface ILANDINGPAGELOGINREQUEST {
  token: string;
  email: string;
  trackId: string;
  referralURL?: string;
}

export interface IGetTracksForCandidateRequest {
  token: string;
  candidateId: string;
  trackEnrollTypes: string[];
}

export interface IMarket {
  name: string;
  logo: string;
  theme: string;
}

export interface ILogin {
  token: string;
  email: string;
  marketId: string;
  socialMediaAuthenticated: boolean;
  password: string;
}

export interface IForgotPassword {
  token: string;
  email: string;
}

export interface IResetPassword {
  token: string;
  password: string;
  passwordToken: string;
}
export interface ISaveResponseForQuestionOfCandidateTrack {
  token: string;
  candidateTrackId: string;
  capabilityId: string;
  questionId: string;
  answer: string;
  questionAnswerId?: string;
}

export interface ISaveResponseForQuestionOfCandidateTracks {
  token: string;
  candidateTrackId: string;
  capabilityIds: string[];
  questionId: string;
  answer?: string;
  questionAnswerId?: string;
  codeAnswer?: string;
  codeType?: string;
  containRecording?: boolean;
}

export interface ISubmitResponseToExpert {
  token: string;
  candidateTrackId: string;
  capabilityId: string;
  questionId: string;
  questionAnswerId: string;
  expertId: string;
}

export interface IVerifyEditing {
  token: string;
  candidateTrackId: string;
  capabilityId: string;
  questionId: string;
  questionAnswerId: string;
}

export interface ICandidateViewedExpertFeedback {
  token: string;
  candidateId: string;
  candidateTrackId: string;
  questionId: string;
  questionAnswerId: string;
  feedbackId: string;
}

export interface IGetAnswerStatusRequest {
  token: string;
  questionAnswerRequest: IQuestionAnswerRequest[];
}

export interface IQuestionAnswerRequest {
  questionId: string,
  questionAnswerId: string,
  clientFeedbackStatus: string,
  clientQuestionAnswerStatus: string
}

export interface ISaveCandidateLastActivity {
  token: string,
  candidateTrackId: string,
  candidateTrackLastActivity: {
    key1?: string,
    value1?: string,
    key2?: string,
    value2?: string,
    key3?: string,
    value3?: string,
    key4?: string,
    value4?: string
  }
}

export interface ILogClientErrors {
  token: string,
  userId: string,
  applicationType: string,
  errorType: string,
  errorMessage: string,
  stackTrace: string,
  remarks?: string,
  browserInfo: string,
  ipAddress: string //(Required)
}

export interface ISaveCandidateDataOptions {
  incCapId?: boolean,
  incQueId?: boolean,
  incQueAnsId?: boolean
}

export interface IGetHintsAndSampleSolution {
  token: string;
  candidateTrackId: string;
  questionId: string;
}

export interface IGetEvalautions {
  token: string;
  candidateTrackId: string;
  questionId: string;
}

export interface IGetCandidateInfoById {
  token: string;
  candidateId: string;
}
export interface IGetDashboardRequest {
  token?: string;
  candidateTrackId: string;
}

export interface IGetQuestionAndExpert {
  token: string;
  trackId: string;
  questionIds: string[];
  expertIds: string[];
  market: string;
}

export interface IGetStatusScoreRequest {
  token?: string;
  candidateTrackId: string;
}

export interface IChangeCandidateTrackPlan {
  token: string,
  candidateId: string,
  market: string,
  trackId: string,
  plan: string,
  displayPlanName: string,
  planState: string
}

interface IGetSketchAnswer {
  token: string,
  candidateTrackId: string,
  questionId: string,
  questionAnswerId: string
}

export interface IGetSketchUserAnswer extends IGetSketchAnswer {
  capabilityIds: Array<string>,

}

export interface IAddSketchAnswer extends IGetSketchUserAnswer {
  sketchData: string
}

export interface IGetSketchExpertAnswer extends IGetSketchAnswer {
  feedbackId: string;
  expertId: string;
}

export interface IPENDINGSCHEDULEMEETINGS {
  token: string;
  candidateId: string;
  trackId: string;
  serviceTypes: string[];
}

export interface MENUNOTIFICATION {
  token: string;
  candidateTrackId: string | null;
  candidateId: string | null;
  trackId: string;
  menu: string;
}

export interface IGETAVAILABLESHAREDQUESTION {
  questionIds: string[],
  candidateTrackId: string
}

export interface ISHAREANSWERANDFEEDBACK {
  questionId: string,
  candidateTrackId: string,
  share: boolean
}

export interface IGETSHAREDQUESTIONS {
  questionId: string,
  candidateTrackId: string,
  count?: number,
  skipCount?: number
}

export interface ISHAREDQUESTIONSID {
  questionId: string,
  communityShared: boolean,
  candidateShared: boolean,
}

export interface ITODOLIST {
  candidateTrackId: string,
  toDoListType: "CANDIDATE_TO_DO_LIST" | "TRACK_TO_DO_LIST"
  expertId?: string
}

export interface ISETTODOLIST {
  candidateTrackId: string,
  updatedBy: "CANDIDATE" | "EXPERT" | string
  updateById: string,
  data: any
  toDoListType: "CANDIDATE_TO_DO_LIST" | "TRACK_TO_DO_LIST" | string
}

export interface S3CURDOPRATIONS {
  path: string,
  candidateTrackId: string
}

export interface GETTRACKTITLE {
  candidateTrackId: string,
  trackIds: string[]
}