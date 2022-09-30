import { Filter } from "../Login/ILogin";
import { FEEDBACK_TYPES } from "../../utilities/constants";

export interface CapabilityId {
    id: string;
    name: string;
}

export interface LatestAnswer {
    questionAnswerId: string;
    answer: string;
    candidateTrackId: string;
    codeAnswer: string,
    codeType: string
}

export interface Submission {
    candidateId: string;
    status: string;
    feedbackAt: string;
    trackId: string;
    marketId: string;
    questionId: string;
    capabilityIds: CapabilityId[];
    latestAnswer: LatestAnswer;
}

export interface CandidateList {
    id: string;
    name: string;
}

export interface Market {
    id: string;
    name: string;
    description: string;
}

export interface objectKeys {
    [key:string]:string
}

export interface TrackId {
    id: string;
    name: string;
    description: string;
    logo: string;
    trackEnrollType: string;
    placementPartner?: IPlacementPartner
}

export interface IPlacementPartner {
    description: string;
    logo: string;
    name: string;
    placementPartnerId: string;
}

export interface Capability {
    id: string;
    name: string;
    description: string;
}

export interface Question {
    id: string;
    name: string;
    description: string;
    answerType: string;
}

export interface CommonData {
    markets: Market[];
    trackIds: TrackId[];
    capability: Capability[];
    question: Question[];
}

export interface Query {
    dataFor: string[];
    filters: Filter[];
}

export interface TabContent {
    expertId: string;
    result: Submission[];
    candidateList: CandidateList[];
    commonData: CommonData;
    count: any;
    query: Query;
}

export interface GetResultFromQuery {
    token: string;
    expertId: string;
    count: number;
    skipCount: number;
    orderBy: string;
    query: Query;
}

export interface CandidateInfo {
    id: string;
    name: string;
    email: string;
}





