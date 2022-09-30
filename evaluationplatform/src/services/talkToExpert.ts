import { IGetExpertsFreeMeetingCount, ISubmitMeetingFeedback, IViewFeedbackOrReview,IGetMeetingInfo } from "utilities/types";
import { post } from "utilities";
import { DEFAULT_TOKEN } from "utilities/constants";

const API_PREFIX = 'evaluationPlatformTalkToExpert';

const API_PREFIX_CANDIDATE = 'evaluationPlatform';

const API_PREFIX_ADMIN = 'evaluationPlatformExpertAdmin';

const getExperts = (data: any) => {
    return post(`stripe/getExpertsByProductServiceTypes`, data, {}, true).then(p => p.output);
};

const createMeeting = (data: any) => {
    return post(`${API_PREFIX}/createMeeting`, data, {}).then(p => p.output);
};

const getMeetingInfo = (data: any) => {
    return post(`${API_PREFIX}/getMeetingInfoForCandidate`, data, {}).then(p => p.output);
};

const updateMeetingInfo = (data: any) => {
    return post(`${API_PREFIX}/updateMeetingInfo`, data, {}).then(p => p.output);
};

const getExpertDetails = (data: any) => {
    return post(`evaluationPlatform/getExpertDetails`, data, {}).then(p => p.output);
}

const getDetailedExpertsByServiceTypes  = (data: any) => {
    return post(`stripe/getDetailedExpertsByServiceTypes`, data, {}, true).then(p => p.output);
}

const getExpertsFreeMeetingCount = (data: IGetExpertsFreeMeetingCount) => {
    return post(`${API_PREFIX}/getExpertsFreeMeetingCount`, {...data, token: DEFAULT_TOKEN}, {})
}

const submitMeetingFeedback = (data: ISubmitMeetingFeedback) => {
    return post(`${API_PREFIX}/setMeetingFeedbackOrReview`, {...data, token: DEFAULT_TOKEN}, {})
}

const getAllTracks = (data: any) => {
    return post(`evaluationPlatform/getAllTracks`, {...data, token: DEFAULT_TOKEN}, {}).then(p => p.output);
}

const candidateViewedExpertNote = (data: IViewFeedbackOrReview) => {
    return post(`${API_PREFIX}/viewedFeedbackOrReview`, { ...data, token: DEFAULT_TOKEN }, {});
}

const getMeetingDetails = (data: IGetMeetingInfo) => {
    return post(`${API_PREFIX}/getMeetingDetails`, { ...data, token: DEFAULT_TOKEN }, {}).then(p => p);
}

const getMeetingStructureFeedbackDetails = (data: IGetMeetingInfo) => {
    return post(`${API_PREFIX_CANDIDATE}/getMeetingStructureFeedbackDetails`, { ...data, token: DEFAULT_TOKEN }, {}).then(p => p);
}

const getCapabilityDetails = (capabilityId: string) => {
    return post(`${API_PREFIX_CANDIDATE}/getCapabilityDetails`, { capabilityId, token: DEFAULT_TOKEN }, {}).then(p => p);
}

export const talkToExpertService = {
    getExperts,
    getAllTracks,
    createMeeting,
    getMeetingInfo,
    updateMeetingInfo,
    getExpertDetails,
    getCapabilityDetails,
    getDetailedExpertsByServiceTypes,
    getExpertsFreeMeetingCount,
    submitMeetingFeedback,
    candidateViewedExpertNote,
    getMeetingDetails,
    getMeetingStructureFeedbackDetails,
};