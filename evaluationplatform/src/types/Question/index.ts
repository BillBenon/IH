interface ISampleSolution {
  description: string;
  hints: string[];
}

interface ICapability {
  capabilityId: string;
  evaluationIds: string[];
  order?: number;
}

export interface IQuestion {
  title: string;
  description: string;
  level: number;
  createdBy: string;
  market: string;
  disabled: boolean;
  disableReason: string;
  questionType: string;
  questionHint: string[];
  sampleSolutions: ISampleSolution[];
  capabilities: ICapability[];
  questionId: string;
}

export interface ICreateQuestionRequest {
  title: string;
  description: string;
  level: number;
  createdBy: string;
  market: string;
  disabled: boolean;
  disableReason: string;
  questionType: string;
  questionHint: string[];
  sampleSolutions: ISampleSolution[];
  capabilities: ICapability[];
}

export interface IDeleteQuestionRequest {
  questionIds: string[];
  deleteToken: string;
}

export interface IGetQuestionsRequest {
  userId: string;
  pageId: number;
  pageSize: number;
  market: string;
}

export interface ISearchQuestionRequest {
  questionIds: string[];
  title: string;
  market: string;
  createdBy: string;
  level: number;
  capabilities: ICapability[];
  selectFields: string[];
  flags: {
    case_sensitive: boolean;
    exact_match: boolean;
  };
}

export interface IUpdateQuestionRequest {
  title: string;
  description: string;
  level: number;
  createdBy: string;
  market: string;
  disabled: boolean;
  disableReason: string;
  questionType: string;
  questionHint: string[];
  sampleSolutions: ISampleSolution[];
  capabilities: ICapability[];
  questionId: string;
}

export interface ISearchQuestionMetadata {
  capabilityName: string;
  category: string;
  question: IQuestion
  subCategory: string;
  capabilityId: string;
  answers: IAnswerWrap[];
}

export interface IHandleNavigationMetadata {
  capabilityName: string;
  category: string;
  question: IQuestion
  subCategory: string;
  capabilityId: string;
  answer?: IAnswer;
}

export interface IQuestion {
  _id: string;
  title: string;
  description: string;
  status: string;
  underFeedbackLoop: boolean;
  level: number;
  createdBy: string;
  updatedBy: string;
  market: string;
  createdAt: string;
  updatedAt: string;
  disabled: boolean;
  questionType: string;
  state: string;
  answerType: string;
  answerCompleted: boolean;
  capabilities: ICapability[];
  hintsAvailable: boolean;
  sampleSolutionsAvailable: boolean;
}

export interface IAnswer {
  _id: string;
  answer: string;
  candidateTrackId: string;
  questionId: string;
  capabilityIds: string[];
  updateAt: string;
  version: number;
  forceFlag: boolean;
  codeAnswer: string;
  codeType: string;
  sketchAvailable: boolean;
};
export interface IFeedbacks {
  expertId: string;
  createdAt: string;
  feedbackAt: string;
  feedbackStatus: string;
  sketchAvailable: boolean;
}

export interface IAnswerWrap {
  answer: IAnswer;
  feedback: any[];
}