import { GetMeetingRequest, ICompleteMeeting, IGetMeetingInfo, ISaveExpertNotes, ISubmitMeetingFeedback, IViewFeedbackOrReview } from '../containers/Meeting/IMeeting';
import { IFocussedModule, IGetDetailsForCandidatebyCandidateTrackIdRequest, IMeetingEvaluationsInput, ICustomQuestionRequest, IDeleteQuestionRequest } from '../containers/Meeting/meetingTypes';
import { post } from '../utilities';
import { API_PREFIX, API_PREFIX_CANDIDATE, API_URL_PREFIX, DEFAULT_TOKEN } from '../utilities/constants';

const getMeetingList = (payload: GetMeetingRequest) => {
    return post(`${API_URL_PREFIX}/getMeetingInfo`, { ...payload, token: DEFAULT_TOKEN });
};

const saveExpertNotes = (payload: ISaveExpertNotes) => {
    return post(`${API_URL_PREFIX}/saveExpertNotes`, { ...payload, token: DEFAULT_TOKEN });
}

const completeMeeting = (payload: ICompleteMeeting) => {
    return post(`${API_URL_PREFIX}/completeMeeting`, { ...payload, token: DEFAULT_TOKEN });
}

const submitMeetingFeedback = (data: ISubmitMeetingFeedback) => {
    return post(`${API_PREFIX}/setMeetingFeedbackOrReview`, { ...data, token: DEFAULT_TOKEN }, {})
}

const expertViewedCandidateReview = (data: IViewFeedbackOrReview) => {
    return post(`${API_PREFIX}/viewedFeedbackOrReview`, { ...data, token: DEFAULT_TOKEN }, {})
}

const getMeetingDetails = (data: IGetMeetingInfo) => {
    return post(`${API_PREFIX}/getMeetingDetails`, { ...data, token: DEFAULT_TOKEN }, {});
}

const getTrackTree = (data: IGetDetailsForCandidatebyCandidateTrackIdRequest) => {
    return post(`${API_URL_PREFIX}/getTrackTree`, { ...data, token: DEFAULT_TOKEN }, {});
}

const getMeetingFocusedModules = (data: { meetingDetailId: string, expertId: string }) => {
    return post(`${API_URL_PREFIX}/getMeetingFocusedModules`, { ...data, expertId: data.expertId, token: DEFAULT_TOKEN }, {});
}

const getMeetingEvaluations = (data: IMeetingEvaluationsInput) => {
    return post(`${API_URL_PREFIX}/getMeetingEvaluations`, { ...data, token: DEFAULT_TOKEN }, {});
}

const saveFocusedModule = (data: { meetingDetailId: string, focusedModules: IFocussedModule[], expertId: string }) => {
    return post(`${API_URL_PREFIX}/saveFocusedModule`, { ...data, token: DEFAULT_TOKEN }, {});
}

const submitMeetingStructureFeedback = (data: { meetingDetailId: string, expertId: string }) => {
    return post(`${API_URL_PREFIX}/submitMeetingStructureFeedback`, { ...data, token: DEFAULT_TOKEN }, {});
}

const getMeetingQuestions = (data: { meetingDetailId: string, expertId: string }) => {
    return post(`${API_URL_PREFIX}/getMeetingQuestions`, { ...data, token: DEFAULT_TOKEN }, {});
}

const getCandidateTrackTree = (payload: { candidateTrackId: string }) => {
    return post(`${API_PREFIX_CANDIDATE}/getCandidateTrackTree`, { ...payload, token: DEFAULT_TOKEN });
};

const addQuestionsForMeeting = (payload: ICustomQuestionRequest) => {
    return post(`${API_URL_PREFIX}/addQuestionsForMeeting`, { ...payload, token: DEFAULT_TOKEN });
}

const deleteQuestionFromMeeting = (payload: IDeleteQuestionRequest) => {
    return post(`${API_URL_PREFIX}/deleteMeetingQuestion`, { ...payload, token: DEFAULT_TOKEN });
}

const saveMeetingStructureFeedback = (payload: any) => {
    return post(`${API_URL_PREFIX}/saveMeetingStructureFeedback`, { ...payload, token: DEFAULT_TOKEN });
}

const getFeedbackStats = (payload: any) => {
    return post(`${API_URL_PREFIX}/getFeedbackStats`, { ...payload, token: DEFAULT_TOKEN });
}

const getQuestionsDetails = (payload: any) => {
    return post(`${API_URL_PREFIX}/getQuestionsDetails`, { ...payload, token: DEFAULT_TOKEN });
}

export const meetingService = {
    saveMeetingStructureFeedback,
    submitMeetingStructureFeedback,
    deleteQuestionFromMeeting,
    getQuestionsDetails,
    addQuestionsForMeeting,
    getCandidateTrackTree,
    getMeetingQuestions,
    saveFocusedModule,
    getTrackTree,
    getMeetingEvaluations,
    getMeetingFocusedModules,
    getMeetingList,
    saveExpertNotes,
    completeMeeting,
    submitMeetingFeedback,
    expertViewedCandidateReview,
    getMeetingDetails,
    getFeedbackStats
};
