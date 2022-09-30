export interface IStatusSS {
    score: number;
    probability: number;
}

export interface ICapabilitySS {
    capabilityId: string;
    capabilityTitle: string;
    capabilityStatus: IStatusSS;
}

export interface ISubCategorySS {
    subCategoryId: string;
    subCategoryTitle: string;
    subCategoryStatus: IStatusSS;
    capabilities: ICapabilitySS[];
}

export interface ICapabilityViewSS {
    categoryId: string;
    categoryTitle: string;
    categoryStatus: IStatusSS;
    subCategories: ISubCategorySS[];
}

export interface IStatusScore {
    candidateTrackId: string;
    trackId: string;
    trackTitle: string;
    trackStatus: IStatusSS;
    capabilityViews: ICapabilityViewSS[];
}

