import axios from "axios";
import { S3CURDOPRATIONS } from "types";
import { DEFAULT_TOKEN } from "utils/constants";

const baseURL = process.env.REACT_APP_API_URL;

const getS3SignedInCredentials = (payload: S3CURDOPRATIONS) => {
    return axios.post(`${baseURL}getS3SignedInCredentialsForFileUploading`, { ...payload, token: DEFAULT_TOKEN });
}

const getS3FolderFiles = (payload: S3CURDOPRATIONS) => {
    return axios.post(`${baseURL}getS3FolderFiles`, { ...payload, token: DEFAULT_TOKEN });
}

const getSignedURLToGETFile = (payload: S3CURDOPRATIONS) => {
    return axios.post(`${baseURL}getSignedURLToGETFile`, { ...payload, token: DEFAULT_TOKEN });
}

const deleteS3File = (payload: S3CURDOPRATIONS) => {
    return axios.post(`${baseURL}deleteS3File`, { ...payload, token: DEFAULT_TOKEN });
}

export const evaluationPlatformExpertAdminService = {
    getS3SignedInCredentials,
    getS3FolderFiles,
    getSignedURLToGETFile,
    deleteS3File
}