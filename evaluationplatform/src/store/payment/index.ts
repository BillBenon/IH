import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    loading: boolean;
    trackId: string;
    trackPlan: string;
    trackName: string;
    planState: string;
}

const initialState: IInitialState = {
    loading: false,
    trackId: '',
    trackPlan: '',
    trackName: '',
    planState: ''
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setTrackInfoForPayment(state, action) {
            state.trackId = action.payload.trackId ?? state.trackId;
            state.trackPlan = action.payload.trackPlan ?? state.trackPlan;
            state.trackName = action.payload.trackName ?? state.trackName;
            state.planState = action.payload.planState ?? state.planState;
        }
    },
});

export const {
    setTrackInfoForPayment
} = paymentSlice.actions;
export default paymentSlice.reducer;
