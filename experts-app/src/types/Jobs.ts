export type JobTracksRequest = {
    expertId: string;
};

export type TrackAndExpertId = {
    expertId: string;
    trackId: string;
};

export type JobTrack = {
    title: string;
    trackId: string;
};

export type CreateJobRequest = {
    expertId: string;
    trackId: string;
    title: string;
    jobType: string;
    description: string;
    profileRequirements: string;
    companyProvide: string;
    openPositions: number;
    attributes: AttributeEntity[];
};

export type AttributeEntity = {
    entity: string;
    entityId: string;
    entityTitle: string;
    children?: AttributeEntityChildren[];
};

export type AttributeEntityChildren = {
    entity: string;
    entityId: string;
    entityTitle: string;
    score?: number;
};

export type JobSearchRequest = {
    expertId: string;
    trackId?: string;
    attributes?: string[];
    count?: number;
    skipCount?: number;
    flags?: {
        case_sensitive: boolean;
        exact_match: boolean;
    }
};

export type JobSearchResult = {
    attributes: AttributeEntity[];
    companyProvide: string;
    description: string;
    expertId: string;
    jobId: string;
    jobType: string;
    openPositions: string;
    profileRequirements: string;
    status: string;
    title: string;
    trackId: string;
};

export type JobCandidatesRequest = {
    expertId: string;
    jobId: string;
};

export type JobCandidate = {
    attributes: AttributeEntity[];
    secondaryAttributes: AttributeEntity[];
    fullname: string;
    email: string;
    candidateId: string;
    trackId: string;
    candidateTrackId?: string;
    status: ChangeRequests;
};

export type CreateCandidateRequest = {
    expertId: string;
    jobId: string;
    email: string;
};

export type ChangeCandidateStatusRequest = {
    expertId: string;
    jobId: string;
    candidateId: string;
    status: ChangeRequests;
};

export type UpdateHiringManagerRequest = {
    expertId: string;
    fullname: string;
    email: string;
    mobile: string;
    companyInfo: string;
    location: string;
    companySize: string;
    calendlyURL: string;
};

export type PaginationRequest = {
    expertId: string;
    count: number;
    skipCount: number;
};

export type JobNotificationsRequest = {
    jobId: string;
} & PaginationRequest;

export type MyDesk = {
    totalCount: number;
    totalFinalizedCandidates: number;
    totalVettedCandidates: number;
    jobs: MyDeskJob[];
};

export type MyDeskJob = {
    jobId: string;
    title: string;
    notifications: string[];
};

export type ChangeRequests = 'TALENT_POOL' | 'VETTED_CANDIDATE' | 'INTERVIEW_REQUEST' | 'FINALIZED_CANDIDATE' | 'REJECTED_CANDIDATE' | 'REMINDER';