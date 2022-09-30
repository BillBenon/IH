import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { talkToExpertService } from "services/talkToExpert";
import { IExpertMeeting, IGetExperts } from "types/TalkToExpert";
import { notEmpty } from "utilities";

interface IInitialState {
    loading: boolean;
    experts: IGetExperts[];
    meetings: IExpertMeeting[] | null;
    error: string;
    saving: boolean;
    selectedExertDetail?: any;
    detailedExperts: any[];
    loadingMeetings: boolean;
}

const initialState: IInitialState = {
    loading: false,
    experts: [],
    meetings: null,
    error: '',
    saving: false,
    detailedExperts: [],
    loadingMeetings: false,
}

const errorHandler = (state: IInitialState, err: string) => {
    if (notEmpty(err))
        state.error = err;
    else
        state.error = 'Something went wrong';
}

export const getExpertsByTrack = createAsyncThunk('talktoexpert/getExpertsByTrack', async (data: any) => {
    return talkToExpertService.getExperts(data);
});

export const getExpertDetail = createAsyncThunk('talktoexpert/getExpertDetails', async (data: any) => {
    return talkToExpertService.getExpertDetails(data);
});

export const getMeetings = createAsyncThunk('talktoexpert/getMeetings', async (data: any) => {
    return talkToExpertService.getMeetingInfo(data);
});

export const saveNotes = createAsyncThunk('talktoexpert/saveNotes', async (data: any) => {
    return talkToExpertService.updateMeetingInfo(data);
});

export const createNewMeeting = createAsyncThunk('talktoexpert/createNewMeeting', async (data: any) => {
    return talkToExpertService.createMeeting(data);
});

export const getDetailedExpertsByServiceTypes = createAsyncThunk('talktoexpert/getDetailedExpertsByServiceTypes', async (data: any) => {
    return talkToExpertService.getDetailedExpertsByServiceTypes(data);
});

const talkToExpertSlice = createSlice({
    name: 'talktoexpert',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload.loading;
        },
        setErrorMessage(state, action) {
            errorHandler(state, action.payload.err);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getExpertsByTrack.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getExpertsByTrack.fulfilled, (state, action) => {
            state.loading = false;
            state.experts = action.payload.experts;
        });
        builder.addCase(getExpertsByTrack.rejected, (state, action) => {
            state.loading = false;
        });
        builder.addCase(getMeetings.pending, (state, action) => {
            state.loading = true;
            state.loadingMeetings = true;
        });
        builder.addCase(getMeetings.fulfilled, (state, action) => {
            state.loading = false;
            state.loadingMeetings = false;
            state.meetings = action.payload.meetings;
        });
        builder.addCase(getMeetings.rejected, (state, action) => {
            state.loading = false;
            state.loadingMeetings = false;
            errorHandler(state, action.error.message ?? '');
        });
        builder.addCase(saveNotes.pending, (state, action) => {
            state.saving = true;
        });
        builder.addCase(saveNotes.fulfilled, (state, action) => {
            state.saving = false;
            // if (state.meetings) {
            //     let index = state.meetings.findIndex(x => x.meetingDetailId == action.payload.meetingDetailId);
            //     if (index >= 0) {
            //         state.meetings[index].candidateNotes = action.payload.candidateNotes;
            //     }
            // }
        });
        builder.addCase(saveNotes.rejected, (state, action) => {
            state.saving = false;
            errorHandler(state, action.error.message ?? '');
        });
        builder.addCase(createNewMeeting.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createNewMeeting.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(createNewMeeting.rejected, (state, action) => {
            state.loading = false;
            errorHandler(state, action.error.message ?? '');
        });
        builder.addCase(getExpertDetail.pending, (state, action) => {
            state.selectedExertDetail = undefined;
            state.loading = true;
        });
        builder.addCase(getExpertDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedExertDetail = action.payload;
        });
        builder.addCase(getExpertDetail.rejected, (state, action) => {
            state.loading = false;
            errorHandler(state, action.error.message ?? '');
        });
        builder.addCase(getDetailedExpertsByServiceTypes.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getDetailedExpertsByServiceTypes.fulfilled, (state, action) => {
            state.loading = false;
            state.detailedExperts = action.payload?.experts;
        });
        builder.addCase(getDetailedExpertsByServiceTypes.rejected, (state, action) => {
            state.loading = false;
            errorHandler(state, action.error.message ?? '');
        });
    }
});

export const {
    setErrorMessage,
    setLoading
} = talkToExpertSlice.actions;
export default talkToExpertSlice.reducer;


