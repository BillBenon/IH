import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { toast } from 'react-toastify';
import { CandidateInfo, CandidateList, Market, Query, Question, Submission, TrackId, Capability } from '../../../containers/Feedback/IFeedback';
import BrowserCacheService from '../../../services/browser-cache';
import { DefaultToastSettings } from '../../../utilities/defaults';
import { getFilteredSubmissions } from './queriesActions';

interface IInitialState {
    activeTab: number,
    error: string | undefined,
    success: string | undefined;
    loading: boolean,
    candidateList: CandidateList[],
    candidateInfo: CandidateInfo[];
    markets: Market[],
    filterCount: any,
    questions: Question[],
    capabilities: Capability[],
    tracks: TrackId[],
    submissions: Submission[],
    totalResultCount: number,
    highlightedCards: any,
}

const initialState: IInitialState = {
    activeTab: 0,
    error: undefined,
    success: undefined,
    loading: false,
    candidateList: [],
    markets: [],
    filterCount: undefined,
    questions: [],
    capabilities: [],
    tracks: [],
    submissions: [],
    candidateInfo: [],
    totalResultCount: 0,
    highlightedCards: {},
};

const expertQuerySlice = createSlice({
    name: 'expertFeedbackQueries',
    initialState,
    reducers: {
        setActiveTab(state, { payload }) {
            state.activeTab = payload.index;
        },
        updateSubmissionStatus(state, { payload }) {
            let index = state.submissions.findIndex((submission: Submission) => submission.latestAnswer.questionAnswerId == payload.questionAnswerId);
            if (index > -1)
                state.submissions[index].status = payload.status;
        },
        updateFilterCount(state, { payload }) {
            state.filterCount[payload.prevFilter] -= 1;
            state.filterCount[payload.newFilter] += 1;
        },
        setHighlightedCard(state, { payload }) {
            state.highlightedCards[state.activeTab] = payload.questionAnswerId;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFilteredSubmissions.pending, (state, action) => {
            state.error = undefined;
            state.loading = true;
        });
        builder.addCase(getFilteredSubmissions.fulfilled, (state, action) => {
            state.success = action.payload.apiMessage;
            state.candidateList = action.payload.output?.candidateList;
            state.markets = action.payload.output.commonData?.markets;
            state.filterCount = { ...action.payload.output.count };
            state.questions = action.payload.output.commonData?.question;
            state.capabilities = action.payload.output.commonData?.capability;
            state.tracks = action.payload.output.commonData?.trackIds;
            state.submissions = action.payload.output.result;
            state.candidateInfo = action.payload.output.commonData?.candidateInfo;
            state.submissions?.forEach((submission: any) => {
                submission["emailaddress"] = state.candidateInfo.find((candidate: CandidateInfo) => candidate.id == submission.candidateId)?.email;
            })
            state.totalResultCount = action.payload.output.totalResultCount;
            state.loading = false;
        });
        builder.addCase(getFilteredSubmissions.rejected, (state, action) => {
            toast.error(action.error.message, DefaultToastSettings);
            state.error = action.error.message;
            state.loading = false;
        });
    },
});

export const {
    setActiveTab,
    setHighlightedCard,
    updateFilterCount,
    updateSubmissionStatus,
} = expertQuerySlice.actions;

export default expertQuerySlice.reducer;
