interface evaluatedCapability {
  capabilityId: string;
  evaluationId: string;
  eidTextFeedback: string;
  eidBooleanFeedback: string;
}

export interface ICreateFeedbackRequest {
  questionAnswerId: string;
  expertId: string;
  questionId: string;
}

export interface IGetFeedbackRequest {
  expertIds: string[];
  quesAnsIds: string[];
  status: string[];
}

export interface IUpdateFeedbackRequest {
  efId: string;
  feedback: string;
  feedbackStatus: string;
  evaluatedCapabilities: evaluatedCapability[];
}
