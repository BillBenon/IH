interface IEvaluation {
  id: string;
  evalText: string;
  hint: string;
  level: number;
  point: number;
  order: number;
}

export interface ICreateCapabilityRequest {
  capabilityText: string;
  description: string;
  category: string;
  subcategory: string;
  trackType: string;
  order: number;
  weight: number;
  evaluations: IEvaluation[];
}

export interface IDeleteCapabilityRequest {
  capabilitiesId: string[];
  deleteToken: string;
}

export interface ISearchCapabilityRequest {
  capabilityId: string;
  category: string;
  subcategory: string;
  tracktype: string;
  capabilityText: string;
  description: string;
  flags: {
    case_sensitive: boolean;
    exact_match: true;
  };
}

export interface IUpdateCapabilityRequest {
  capabilityText: string;
  description: string;
  category: string;
  subcategory: string;
  trackType: string;
  order: number;
  weight: number;
  evaluations: IEvaluation[];
  capabilityId: string;
}
