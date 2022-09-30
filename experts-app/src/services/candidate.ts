import { GetCandidateAuthorizationTokenRequest, GetCandidateRequest, SaveCandidateReportLinkRequest, S3CURDOPRATIONS } from '../containers/Candidate/ICandidate';
import { post } from '../utilities';
import { API_URL_PREFIX, DEFAULT_TOKEN } from '../utilities/constants';

const getCandidatesAssociatedByExpert = (payload: GetCandidateRequest) => {
    return post(`${API_URL_PREFIX}/getCandidatesAssociatedByExpert`, { ...payload, token: DEFAULT_TOKEN });
};

const getAllCandidates = (expertId: string) => {
    return post(`${API_URL_PREFIX}/getAllCandidates`, { expertId, token: DEFAULT_TOKEN });
};

const getCandidateTrack = (candidateId: string) => {
    return post(`${API_URL_PREFIX}/getCandidateTracks`, { candidateId, token: DEFAULT_TOKEN });
};

const saveCandidateReportLink = (payload: SaveCandidateReportLinkRequest) => {
    return post(`${API_URL_PREFIX}/saveCandidateReportLink`, { ...payload, token: DEFAULT_TOKEN });
};

const getCandidateAuthorizationToken = (payload: GetCandidateAuthorizationTokenRequest) => {
    return post(`${API_URL_PREFIX}/getCandidateAuthorizationToken`, { ...payload});
}

const getS3SignedInCredentials = (payload: S3CURDOPRATIONS) => {
    return post(`${API_URL_PREFIX}/getS3SignedInCredentialsForFileUploading`, { ...payload, token: DEFAULT_TOKEN });
}

const getS3FolderFiles = (payload: S3CURDOPRATIONS) => {
    return post(`${API_URL_PREFIX}/getS3FolderFiles`, { ...payload, token: DEFAULT_TOKEN });
}

const getSignedURLToGETFile = (payload: S3CURDOPRATIONS) => {
    return post(`${API_URL_PREFIX}/getSignedURLToGETFile`, { ...payload, token: DEFAULT_TOKEN });
}

const deleteS3File = (payload: S3CURDOPRATIONS) => {
    return post(`${API_URL_PREFIX}/deleteS3File`, { ...payload, token: DEFAULT_TOKEN });
}

export const candidateService = {
    getCandidatesAssociatedByExpert,
    getAllCandidates,
    getCandidateTrack,
    saveCandidateReportLink,
    getS3SignedInCredentials,
    getS3FolderFiles,
    getSignedURLToGETFile,
    deleteS3File,
    getCandidateAuthorizationToken
};
