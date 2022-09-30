import { GetResultFromQuery } from '../containers/Feedback/IFeedback';
import {
    DetailedSubmissionInput,
    IAddSketchFeedback,
    IGetSketchFeedbackAnswer,
    IGetSketchUserAnswer,
    SaveFeedbackInput,
} from '../containers/Feedback/TabContent/Submissions/SubmissionDetail/ISubmissionDetail';
import { post } from '../utilities';
import { API_URL_PREFIX, DEFAULT_TOKEN } from '../utilities/constants';

const getFilteredSubmissions = (payload: GetResultFromQuery) => {
    return post(`${API_URL_PREFIX}/getResultForQuery`, payload);
};

const getDetailedSubmission = (payload: DetailedSubmissionInput) => {
    return post(`${API_URL_PREFIX}/getAnswerFeedbackByCandidateTrackId`, payload)
}

const saveFeedback = (payload: SaveFeedbackInput) => {
    return post(`${API_URL_PREFIX}/saveFeedbackForResponseByExpert`, payload)
}

const submitFeedback = (payload: SaveFeedbackInput) => {
    return post(`${API_URL_PREFIX}/submitFeedbackForResponseByExpert`, payload)
}

const getUserSketch = (payload: IGetSketchUserAnswer) => {
    return post(`${API_URL_PREFIX}/getSketchAnswer`, payload)
}

const getExpertSketch = (payload: IGetSketchFeedbackAnswer) => {
    return post(`${API_URL_PREFIX}/getSketchFeedback`, payload)
}

const addExpertSketch = (payload: IAddSketchFeedback) => {
    return post(`${API_URL_PREFIX}/addSketchFeedback`, payload)
}

const getHints = (payload: { questionId: string, candidateTrackId: string, expertId: string }) => {
    return post(`${API_URL_PREFIX}/getHints`, { ...payload, token: DEFAULT_TOKEN })
}

const getSampleSolutions = (payload: { questionId: string, candidateTrackId: string, expertId: string }) => {
    return post(`${API_URL_PREFIX}/getSampleSolutions`, { ...payload, token: DEFAULT_TOKEN })
}

export const submissionService = {
    getFilteredSubmissions,
    getDetailedSubmission,
    saveFeedback,
    submitFeedback,
    getUserSketch,
    addExpertSketch,
    getExpertSketch,
    getHints,
    getSampleSolutions,
};
