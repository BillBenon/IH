export interface ICreateExpertRequest {
  username: string;
  roleType: string;
  expertCategory: string;
  photoURL: string;
  workingAt: string;
  profile: string;
  reviews: [
    {
      date: string;
      reviewBy: string;
      comment: string;
    }
  ];
}

export interface IDeleteExpertRequest {
  expertIds: string[];
  deleteToken: string;
}

export interface ISearchExpertRequest {
  expertIds: string[];
  username: string;
  roleType: string;
  expertCategory: string;
  photoURL: string;
  workingAt: string;
  profile: string;
  flags: {
    case_sensitive: true;
    exact_match: true;
  };
}

export interface IUpdateExpertRequest {
  username: string;
  roleType: string;
  expertCategory: string;
  photoURL: string;
  workingAt: string;
  profile: string;
  reviews: [
    {
      date: string;
      reviewBy: string;
      comment: string;
    }
  ];
  expertId: string;
}
