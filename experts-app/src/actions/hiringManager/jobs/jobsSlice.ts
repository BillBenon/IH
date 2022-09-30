import { createSlice } from "@reduxjs/toolkit";
import { getExpertDetails } from "actions/auth/authActions";
import { Category } from "containers/Meeting/meetingTypes";
import { JobCandidate, JobSearchResult, JobTrack, MyDesk } from "types/Jobs";
import {
    getAllTracksForJobsAction,
    getTrackTreeAction,
    createJobAction,
    getJobsAction,
    getJobCandidatesAction,
    createCandidateAction,
    changeCandidateStatusAction,
    updateHiringManagerAction,
    getJobDeskAction,
    getJobNotificationsAction,
} from "./jobsActions";

interface IInitialState {
    loading: boolean;
    success: boolean;
    error: boolean;
    jobTracks: JobTrack[];
    trackTree: Category[];
    jobResults: JobSearchResult[];
    fetchJobs: boolean;
    vettedCandidates: JobCandidate[];
    talentPoolCandidates: JobCandidate[];
    interviewRequestCandidates: JobCandidate[];
    rejectedCandidates: JobCandidate[];
    finalizeCandidates: JobCandidate[];
    refetchCandidates: boolean;
    changeNotification: { show: boolean, status: string };
    isHiringManagerProfileUpdated: boolean;
    loadInitialProfileDetails: boolean;
    jobDeskDetails: MyDesk;
}

const initialState: IInitialState = {
    loading: false,
    success: false,
    error: false,
    jobTracks: [],
    trackTree: [],
    jobResults: [],
    fetchJobs: true,
    vettedCandidates: [],
    talentPoolCandidates: [],
    interviewRequestCandidates: [],
    rejectedCandidates: [],
    finalizeCandidates: [],
    refetchCandidates: false,
    changeNotification: { show: false, status: '' },
    isHiringManagerProfileUpdated: true,
    loadInitialProfileDetails: true,
    jobDeskDetails: { jobs: [], totalCount: 0, totalFinalizedCandidates: 0, totalVettedCandidates: 0 },
};

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        resetCandidates(state) {
            state.talentPoolCandidates = [];
            state.vettedCandidates = [];
        },
        setFetchJobs(state, { payload }) {
            state.fetchJobs = payload.fetchJobs;
        },
        setRefetchCandidates(state, { payload }) {
            state.refetchCandidates = payload.refetchCandidates;
        },
        resetTrackTree(state) {
            state.trackTree = [];
        },
        resetChangeNotification(state) {
            state.changeNotification = { show: false, status: '' };
        },
        setHiringManagerProfileUpdateStatus(state, { payload }) {
            state.isHiringManagerProfileUpdated = payload.isHiringManagerProfileUpdated;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTracksForJobsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllTracksForJobsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.jobTracks = action.payload?.output.tracks;
        });
        builder.addCase(getTrackTreeAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getTrackTreeAction.fulfilled, (state, action) => {
            state.loading = false;
            state.trackTree = action.payload?.output.categories;
        });
        builder.addCase(createJobAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createJobAction.fulfilled, (state, action) => {
            state.loading = false;
            state.fetchJobs = true;
        });
        builder.addCase(getJobsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getJobsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.jobResults = action.payload?.output;
        });
        builder.addCase(getJobCandidatesAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getJobCandidatesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.vettedCandidates = action.payload?.output?.vettedCandidates || [];
            state.talentPoolCandidates = action.payload?.output?.talentPoolCandidates || [];
            state.interviewRequestCandidates = action.payload?.output?.interviewRequestCandidates || [];
            state.rejectedCandidates = action.payload?.output?.rejectedCandidates || [];
            state.finalizeCandidates = action.payload?.output?.finalizeCandidates || [];
            state.changeNotification = { ...state.changeNotification, show: true };
        });
        builder.addCase(createCandidateAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createCandidateAction.fulfilled, (state, action) => {
            state.loading = false;
            state.refetchCandidates = true;
        });
        builder.addCase(changeCandidateStatusAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(changeCandidateStatusAction.fulfilled, (state, action) => {
            state.loading = false;
            state.refetchCandidates = true;
            state.changeNotification = { show: false, status: action.meta.arg.status };
        });
        builder.addCase(updateHiringManagerAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateHiringManagerAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isHiringManagerProfileUpdated = true;
        });
        builder.addCase(getExpertDetails.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getExpertDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.loadInitialProfileDetails = false;
            const profileDetails = action.payload.output;
            if (!profileDetails.companyInfo) {
                state.isHiringManagerProfileUpdated = false;
            }
        });
        builder.addCase(getJobDeskAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getJobDeskAction.fulfilled, (state, action) => {
            state.loading = false;
            state.jobDeskDetails = action.payload.output;
        });
    }
});

export default jobsSlice.reducer;

export const {
    resetCandidates,
    setFetchJobs,
    setRefetchCandidates,
    resetTrackTree,
    resetChangeNotification,
} = jobsSlice.actions;