import { IFocussedModule } from "containers/TalkToExpert/meetingTypes";

export interface IGetExperts {
    expertId: string;
    fullName: string;
    totalPendingMeeting: number
}

export interface IExpertMeeting {
    meetingDetailId: string;
    candidateId: string;
    meetingTime: string;
    meetingTitle: string;
    meetingPurpose: string;
    meetingStatus: string;
    zoomMeetingId: string;
    zoomMeetingLink: string;
    zoomMeetingPassword: string;
    zoomMeetingVideoLink: string;
    candidateNotes: string;
    expertFeedback: {rating: null, comment: string};
    expertId: string;
    zoomMeetingRecordedVideoLink: string;
    zoomMeetingRecordedVideoLinkPassword: string;
    remarks: string;
    createdAt: string;
    trackName: string;
    candidateFeedback?: ICandidateFeedback;
    reviewStatus: string;
    resumeUrl: string;
    serviceType: string;
    feedbackStatus: string;
    focusedModules: IFocussedModule[];
}

export interface ICandidateFeedback {
    rating: number;
    comment: string;
}