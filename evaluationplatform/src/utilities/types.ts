export interface IGetExpertsFreeMeetingCount {
    candidateId: string,
    trackId: string,
    expertIds: string[]
}

export interface ISubmitMeetingFeedback {
    meetingDetailId: string,
    type: "EXPERT" | "CANDIDATE",
    feedback: IFeedback,
    submit: true | false
}

export interface IFeedback {
    rating: number,
    comment: string,
}

export interface IViewFeedbackOrReview {
    meetingDetailId: string | undefined,
    type: "EXPERT" | "CANDIDATE",
}

export interface IGetMeetingInfo {
    meetingDetailId: string | undefined,
}