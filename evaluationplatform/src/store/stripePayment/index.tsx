import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    stripeKey: string;
}

const initialState: IInitialState = {
    stripeKey: ''
};

const stripePaymentSlice = createSlice({
    name: 'stripePayment',
    initialState,
    reducers: {
        setStripeKey(state, action) {
            state.stripeKey = action.payload.publicKey;
        }
    },
});

export const {
    setStripeKey
} = stripePaymentSlice.actions;
export default stripePaymentSlice.reducer;
