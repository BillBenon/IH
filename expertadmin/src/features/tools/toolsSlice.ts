import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EmailStatusPagination, PaginationFilters } from 'types';
import { sendEmailsToUsers } from './tools.Actions';

interface IInitialState {
    loading: boolean;
    success: boolean;
    error: boolean;
    mailStatus: {
        filteredEmails: any[];
        totalEmails: number;
        filterRequest: EmailStatusPagination;
    }
}

const initialState: IInitialState = {
    loading: false,
    success: false,
    error: false,
    mailStatus: {
        filteredEmails: [],
        totalEmails: 0,
        filterRequest: { count: 0, skipCount: 0 }
    }
};

const toolsSlice = createSlice({
    name: 'tools',
    initialState,
    reducers: {
        setPaginationFilter(state, { payload }: PayloadAction<PaginationFilters>) {
            if (payload.count != undefined) state.mailStatus.filterRequest.count = payload.count;
            state.mailStatus.filterRequest.skipCount = payload.skipCount;
        },
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(sendEmailsToUsers.pending, (state) => {
            state.error = false;
            state.success = false;
            state.loading = true;
        });
        builder.addCase(sendEmailsToUsers.fulfilled, (state) => {
            state.error = false;
            state.success = true;
            state.loading = false;
        });
        builder.addCase(sendEmailsToUsers.rejected, (state) => {
            state.error = true;
            state.success = false;
            state.loading = false;
        });
    },
});

export const { reset, setPaginationFilter } = toolsSlice.actions;
export default toolsSlice.reducer;