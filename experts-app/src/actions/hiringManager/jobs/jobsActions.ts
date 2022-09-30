import { createAsyncThunk } from '@reduxjs/toolkit';
import { jobsService } from 'services/jobs';
import {
    JobTracksRequest,
    TrackAndExpertId,
    JobSearchRequest,
    CreateJobRequest,
    JobCandidatesRequest,
    CreateCandidateRequest,
    ChangeCandidateStatusRequest,
    UpdateHiringManagerRequest,
    PaginationRequest,
    JobNotificationsRequest
} from 'types/Jobs';

export const getAllTracksForJobsAction = createAsyncThunk(
    `hiringManager/getTracksForJob`,
    async (getTracksForJobRequest: JobTracksRequest) => {
        const response = await jobsService.getAllTracksForJobs(getTracksForJobRequest);
        return response;
    }
);

export const getTrackTreeAction = createAsyncThunk(
    `hiringManager/getTrackTree`,
    async (getTrackTreeRequest: TrackAndExpertId) => {
        const response = await jobsService.getTrackTree(getTrackTreeRequest);
        return response;
    }
);

export const getJobsAction = createAsyncThunk(
    `hiringManager/getJobDetails`,
    async (getJobDetailsRequest: JobSearchRequest) => {
        const response = await jobsService.getJobs(getJobDetailsRequest);
        return response;
    }
);

export const createJobAction = createAsyncThunk(
    `hiringManager/createJob`,
    async (createJobRequest: CreateJobRequest) => {
        const response = await jobsService.createJob(createJobRequest);
        return response;
    }
);

export const getJobCandidatesAction = createAsyncThunk(
    `hiringManager/getJobCandidatesAction`,
    async (candidatesRequest: JobCandidatesRequest) => {
        const response = await jobsService.getJobCandidates(candidatesRequest);
        return response;
    }
);

export const createCandidateAction = createAsyncThunk(
    `hiringManager/createCandidate`,
    async (createCandidateRequest: CreateCandidateRequest) => {
        const response = await jobsService.createCandidate(createCandidateRequest);
        return response;
    }
);

export const changeCandidateStatusAction = createAsyncThunk(
    `hiringManager/changeCandidateStatus`,
    async (createCandidateRequest: ChangeCandidateStatusRequest) => {
        const response = await jobsService.changeCandidateStatus(createCandidateRequest);
        return response;
    }
);

export const updateHiringManagerAction = createAsyncThunk(
    `hiringManager/updateHiringManager`,
    async (updateHiringManagerRequest: UpdateHiringManagerRequest) => {
        return await jobsService.updateHiringManager(updateHiringManagerRequest);
    }
);

export const getJobDeskAction = createAsyncThunk(
    `hiringManager/getJobDesk`,
    async (paginationRequest: PaginationRequest) => {
        return await jobsService.getJobDesk(paginationRequest);
    }
);

export const getJobNotificationsAction = createAsyncThunk(
    `hiringManager/getJobNotifications`,
    async (jobNotificationsRequest: JobNotificationsRequest) => {
        return await jobsService.getJobNotifications(jobNotificationsRequest);
    }
);