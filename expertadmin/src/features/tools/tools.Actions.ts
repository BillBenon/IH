import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendEmailsApi } from 'api/mailToolApi';
import { SendEmail } from 'types';

export const sendEmailsToUsers = createAsyncThunk(
    `expert/sendEmail`,
    async (payload: SendEmail) => {
        const response = await sendEmailsApi.sendEmails(payload);
        return response;
    }
);