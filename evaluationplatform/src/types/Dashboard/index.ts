
export interface IStatus extends IObjectKeys {
    totalCapability: number;
    totalCategory: number;
    totalSubCategory: number;
    totalQuestion: number;
    totalUnAnswered: number;
    totalSavedAnswer: number;
    totalSendForReview: number;
    totalUnderReview: number;
    totalFeedbackReceived: number;
    totalFeedbackViewed: number;
}

export interface ICapability {
    capabilityId: string;
    capabilityTitle: string;
    capabilityStatus: IStatus;
}

export interface ISubCategory {
    subCategoryId: string;
    subCategoryTitle: string;
    subCategoryStatus: IStatus;
    capabilities: ICapability[];
}

export interface ICapabilityView {
    categoryId: string;
    categoryTitle: string;
    categoryStatus: IStatus;
    subCategories: ISubCategory[];
}

export interface IAnswerInfo {
    questionId: string;
    questionTitle: string;
    capabilityId: string;
    capabilityTitle: string;
    categoryId: string;
    categoryTitle: string;
    subCategoryId: string;
    subCategoryTitle: string;
}

export interface IObjectKeys {
    [key: string]: any
}

export interface IStatusView extends IObjectKeys {
    answered: IAnswerInfo[];
    unAnswered: IAnswerInfo[];
    feedBackReceived: IAnswerInfo[];
    feedBackViewedByCandidate: IAnswerInfo[];
    underReview: IAnswerInfo[];
    sendForReview: IAnswerInfo[];
}

export interface ICategory {
    id: string;
    name: string;
    description: string;
}

export interface ISubCategoryInfo {
    id: string;
    name: string;
    description: string;
}

export interface ICapabilityInfo {
    id: string;
    name: string;
    description: string;
}

export interface IQuestion {
    id: string;
    name: string;
    description: string;
}

export interface ICommonData {
    categories: ICategory[];
    subCategories: ISubCategoryInfo[];
    capabilities: ICapabilityInfo[];
    questions: IQuestion[];
}

export interface IDashboardData {
    candidateTrackId: string;
    trackId: string;
    trackTitle: string;
    trackStatus: IStatus;
    capabilityViews: ICapabilityView[];
    statusView: IStatusView;
    commonData: ICommonData;
}

