export interface ICreateQuestionAnswerRequest {
  answer: string;
  candidateTrackId: string;
  questionId: string;
}

export interface ISearchQuestionAnswerRequest {
  candidateTrackId: string;
  questionId: string;
  flags: {
    case_sensitive: boolean;
    exact_match: boolean;
  };
}

export interface IUpdateQuestionAnswerRequest {
  answer: string;
  candidateTrackId: string;
  questionId: string;
  questionAnswerId: string;
  forceUpdate: boolean;
}
