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
    entity: "CATEGORY" | "SUBCATEGORY" | "CAPABILITY",
    entityId: string,
    entityTitle?: string,
    children: IFocussedModule[] // optional
}