export type GetMeetingRequest = {
  meetingType: string;
  expertId: string;
  candidateId: string;
  startDate: string;
  endDate: string;
}

export type ISaveExpertNotes = {
  expertId: string,
  meetingId: string,
  expertNotes: string
}

export type ICompleteMeeting = {
  expertId: string,
  meetingDetailId: string,
  meetingStatus: string,
  remarks?: string,
}

export interface ISubmitMeetingFeedback {
  meetingDetailId: string,
  type: "EXPERT" | "CANDIDATE",
  feedback: IFeedback,
  submit: true | false
}

export interface IFeedback {
  comment: string
}

export interface IViewFeedbackOrReview {
  meetingDetailId: string | undefined,
  type: "EXPERT" | "CANDIDATE",
}

export interface IGetMeetingInfo {
  meetingDetailId: string | undefined,
}
