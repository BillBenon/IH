import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { DetailedSubmissionInput, SaveFeedbackInput } from '../../../../containers/Feedback/TabContent/Submissions/SubmissionDetail/ISubmissionDetail';
import { submissionService } from '../../../../services/submission';

export const getSubmissionDetail = createAsyncThunk(
    `submission/getSubmissionDetail`,
    async (query: DetailedSubmissionInput) => {
        const response = await submissionService.getDetailedSubmission(query);
        return response;
    }
);

export const saveFeedback = createAsyncThunk(
    `submission/saveFeedback`,
    async (query: SaveFeedbackInput) => {
        const response = await submissionService.saveFeedback(query);
        return response;
    }
);

export const submitFeedback = createAsyncThunk(
    `submission/submitFeedback`,
    async (query: SaveFeedbackInput) => {
        const response = await submissionService.submitFeedback(query);
        return response;
    }
);

export const getQuestionHints = createAsyncThunk(
    `submission/getQuestionHints`,
    async (query: { questionId: string, candidateTrackId: string, expertId: string }) => {
        const response = await submissionService.getHints({ ...query });
        return response;
    }
)

export const getQuestionSampleSolutions = createAsyncThunk(
    `submission/getQuestionSampleSolutions`,
    async (query: { questionId: string, candidateTrackId: string, expertId: string }) => {
        const response = await submissionService.getSampleSolutions({ ...query });
        return response;
    }
)