import { post } from '../utilities';
import { API_URL_PREFIX, DEFAULT_TOKEN } from '../utilities/constants';
import {
    JobTracksRequest,
    TrackAndExpertId,
    CreateJobRequest,
    JobSearchRequest,
    JobCandidatesRequest,
    CreateCandidateRequest,
    ChangeCandidateStatusRequest,
    UpdateHiringManagerRequest,
    PaginationRequest,
    JobNotificationsRequest
} from 'types/Jobs';

const getAllTracksForJobs = (payload: JobTracksRequest) => {
    return post(`${API_URL_PREFIX}/getAllTracksForJobs`, { ...payload, token: DEFAULT_TOKEN });
};

const getTrackTree = (payload: TrackAndExpertId) => {
    return post(`${API_URL_PREFIX}/getTrackTree`, { ...payload, token: DEFAULT_TOKEN });
};

const createJob = (payload: CreateJobRequest) => {
    return post(`${API_URL_PREFIX}/createJob`, { ...payload, token: DEFAULT_TOKEN });
}

const getJobs = (payload: JobSearchRequest) => {
    return post(`${API_URL_PREFIX}/getResultForJobSearch`, { ...payload, token: DEFAULT_TOKEN });
}

const getJobCandidates = (payload: JobCandidatesRequest) => {
    return post(`${API_URL_PREFIX}/getJobCandidates`, { ...payload, token: DEFAULT_TOKEN });
}

const createCandidate = (payload: CreateCandidateRequest) => {
    return post(`${API_URL_PREFIX}/createCandidate`, { ...payload, token: DEFAULT_TOKEN });
}

const changeCandidateStatus = (payload: ChangeCandidateStatusRequest) => {
    return post(`${API_URL_PREFIX}/changeCandidateStatus`, { ...payload, token: DEFAULT_TOKEN });
}

const updateHiringManager = (payload: UpdateHiringManagerRequest) => {
    return post(`${API_URL_PREFIX}/updateHiringManager`, { ...payload, token: DEFAULT_TOKEN });
}

const getJobDesk = (payload: PaginationRequest) => {
    return post(`${API_URL_PREFIX}/getJobDesk`, { ...payload, token: DEFAULT_TOKEN });
}

const getJobNotifications = (payload: JobNotificationsRequest) => {
    return post(`${API_URL_PREFIX}/getJobDesk`, { ...payload, token: DEFAULT_TOKEN });
}

export const jobsService = {
    getAllTracksForJobs,
    getTrackTree,
    createJob,
    getJobs,
    getJobCandidates,
    createCandidate,
    changeCandidateStatus,
    updateHiringManager,
    getJobDesk,
    getJobNotifications,
}