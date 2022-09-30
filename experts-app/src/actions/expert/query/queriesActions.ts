import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetResultFromQuery } from '../../../containers/Feedback/IFeedback';
import { submissionService } from '../../../services/submission';

export const getFilteredSubmissions = createAsyncThunk(
    `expertFeedbackQueries/getFilteredSubmissions`,
    async (query: GetResultFromQuery) => {
        const response = await submissionService.getFilteredSubmissions(query);
        return response;
    }
);