export type Expert = {
    _id: string,
    fullname: string,
    email: string,
    roleType: string,
    accessLevel: string[],
    expertCategory: string,
    profile: string,
    photoURL: string,
    workingAt: string,
    reviews: ExpertReviews[]
}

export type ExpertReviews = {
    date: string,
    reviewBy: string,
    comment: string
}