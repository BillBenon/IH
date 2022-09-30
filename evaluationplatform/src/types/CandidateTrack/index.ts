export interface ICreateCandidateTrackRequest {
  candidateEmail: string;
  trackId: string;
  overallfeedback: string;
  market: string;
  trackType: string;
  trackSubType: string;
  enhancedcapIds: string[];
}

export interface IDeleteCandidateTrackRequest {
  trackIds: string[];
  deleteToken: string;
}

export interface ISearchCandidateTrackRequest {
  candidateEmail: string;
  trackId: string;
  market: string;
  flag: {
    case_sensitive: boolean;
    exact_match: boolean;
  };
}

export interface IUpdateCandidateTrackRequest {
  candidateEmail: string;
  trackId: string;
  overallfeedback: string;
  market: string;
  trackType: string;
  trackSubType: string;
  enhancedcapIds: string[];
  candidateTrackId: string;
}
