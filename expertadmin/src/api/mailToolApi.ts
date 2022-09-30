import { post } from './evaluationPlatformApi';
import { SendEmail } from 'types';
import { API, DEFAULT_TOKEN } from 'utils/constants';

const baseUrl = process.env.REACT_APP_API_URLEVALUATION;

const sendEmails = (payload: SendEmail) => {
    return post(baseUrl + API.SENDEMAILSAPI, { ...payload, token: DEFAULT_TOKEN });
};

export const sendEmailsApi = {
    sendEmails,
};