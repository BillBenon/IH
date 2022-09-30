export interface ICreateTrackRequest {
  title: string;
  description: string;
  detailsDescription: string;
  trackType: string;
  trackSubType: string;
  market: string;
  logo: string;
  capabilityIds: string[];
  status: string;
  expertIds: string[];
}

export interface IDeleteTrackRequest {
  trackIds: string[];
  deleteToken: string;
}

export interface ISearchTrackRequest {
  trackIds: string[];
  title: string;
  description: string;
  trackType: string;
  trackSubType: string;
  market: string;
  logo: string;
  capabilityIds: string[];
  status: string;
  expertIds: string[];
  flags: {
    case_sensitive: boolean;
    exact_match: boolean;
  };
}

export interface IUpdateTrackRequest {
  title: string;
  description: string;
  detailsDescription: string;
  trackType: string;
  trackSubType: string;
  market: string;
  logo: string;
  capabilityIds: string[];
  status: string;
  expertIds: string[];
  trackId: string;
}
