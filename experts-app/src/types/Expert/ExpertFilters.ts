export type MarketCategoryFilter = {
    name: string,
    groupIds: Array<string>
}

export type CommonFilter = {
    id: string,
    name: string,
    groupIds: string[]
}

export type CandidatesFilter = {
    id: string,
    name: string,
    email: string,
    groupId: string[]
}

export type FeedbackStatus = {
    status: string,
    groupId: string[]
}

export type CapabilityFilter = {

}
export type ExpertFilters = {
    markets: MarketCategoryFilter[],
    tracks: CommonFilter[],
    candidates: CandidatesFilter[],
    capability: CommonFilter[],
    categorySubcategory: MarketCategoryFilter,
    question: CommonFilter,
    feedbackStatus: FeedbackStatus
}