export interface Capability {
    capabilityId: string;
    capabilityName: string;
}

export interface SubCategory {
    subCategoryName: string;
    subCategoryId: string;
    capabilities: Capability[];
}

export interface Category {
    categoryName: string;
    categoryId: string;
    subCategories: SubCategory[];
}

export interface CandidateTrackTree {
    categories: Category[];
}

export interface IFocussedModule {
    entity: "CATEGORY" | "SUBCATEGORY" | "CAPABILITY" | "QUESTION",
    entityId: string,
    entityTitle?: string;
    children: IFocussedModule[],
}

export interface IGetDetailsForCandidatebyCandidateTrackIdRequest {
    token?: string;
    trackId: string;
    expertId: string;
}


export interface IQuestionCapability {
    capabilityId: string;
    questionId: string;
}

export interface IMeetingEvaluationsInput {
    expertId: string;
    candidateId: string;
    trackId: string;
    questionCapabilities: IQuestionCapability[];
    meetingDetailId: string;
}

export interface IMeetingQuestion {
    capabilityId: string;
    containRecording: boolean;
    questionId: string;
    title: string;
    questionType: string;
    questionStatus?: string;
    capabilityName?: string;
}

export interface IMeetingDetail {
    meetingDetailId: string;
    candidateId: string;
    expertId: string;
    trackId: string;
    trackName: string;
    meetingTime: string;
    meetingTitle: string;
    meetingPurpose: string;
    zoomMeetingId: string;
    zoomMeetingLink: string;
    zoomMeetingDuration: string;
    zoomMeetingCreatedAt: string;
    zoomMeetingTimezone: string;
    candidateNotes: string;
    resumeUrl: string;
    createdAt: string;
    updateAt: string;
    serviceType: string;
    feedbackStatus: string;
    reviewStatus: string;
    candidateName: string;
    expertFeedback: any;
    candidateFeedback: any;
    focusedModules: IFocussedModule[];
    structureFeedbackStatus?: string;
}

export interface ICustomQuestionRequest {
    expertId: string;
    title: string;
    description: string;
    capabilityId: string;
    meetingDetailId: string;
}

export interface IDeleteQuestionRequest {
    expertId: string;
    questionId: string;
    capabilityId: string;
    meetingDetailId: string;
}

export interface IndirectCapability {
    capabilityId: string;
    categoryId: string;
    subCategoryId: string;
    evaluationIds: string[];
}

export interface ICustomQuestion {
    questionId: string;
    title: string;
    description: string;
    level: number;
    createdBy: string;
    market: string;
    updatedAt: string;
    disabled: boolean;
    questionType: string;
    answerType: string;
    updatedBy: string;
    state: string;
    questionHint: any[];
    sampleSolutions: any[];
    capabilities: any[];
    hintIds: any[];
    solutionIds: any[];
    indirectCapabilities: IndirectCapability[];
}

