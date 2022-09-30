import { Query } from "../Feedback/IFeedback";

export interface Review {
  date: string;
  reviewBy: string;
  comment: string;
}

export interface Filter {
  filterKey: string;
  filterValueName: string;
  filterValueId: string;
}

export interface SaveQuery {
  tabOrder: string;
  queryType: string,
  fixedQuery: string,
  queryName: string | undefined;
  count: number;
  skipCount: number;
  orderBy: string;
  query: Query
}

export interface LastActivity {
  token: string;
  expertId: string;
  level1: string;
  level2: string | undefined;
  level3: string | undefined;
  level4: string | undefined;
  saveQueries: SaveQuery[];
}

export interface ExpertDetail {
  apiStatus: string;
  apiMessage: string;
  expertId: string;
  fullname: string;
  email: string;
  companyName: string;
  roleType: string;
  accessLevels: string[];
  expertCategory: string;
  photoURL: string;
  workingAt: string;
  profile: string;
  calendlyURL: string;
  reviews: Review[];
  lastActivity: LastActivity;
}
