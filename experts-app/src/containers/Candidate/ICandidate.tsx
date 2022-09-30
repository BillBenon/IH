export type GetCandidateRequest = {
  interactionTypes: string[];
  expertId: string;
}

export type SaveCandidateReportLinkRequest = {
  candidateTrackId: string;
  reportUrl: string;
  expertId: string;
}

export type CandidateTrack = {
  trackId: string;
  title: string;
  trackType: string;
  candidateTrackId:string;
}

export type GetCandidateDetailRequest = {
  candidateId: string;
  trackId: string;
}

export type GetCandidateAuthorizationTokenRequest = {
  expertId: string,
  token: string,
  candidateId: string,
}

export type Candidates = {
  candidateId: string;
  candidateName?: string;
  candidateEmail: string[];
  tracks: CandidateTrack[];
};

export interface S3CURDOPRATIONS {
  path: string,
  expertId:string
}