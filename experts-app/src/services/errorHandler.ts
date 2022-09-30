import { ErrorContainer } from '../types/Error';
import { post } from '../utilities';
import { API_URL_UTILITIES } from '../utilities/constants';

const logClientErrors = (payload: ErrorContainer) => {
    return post(`${API_URL_UTILITIES}/logClientErrors`, payload);
};

export const errorService = {
    logClientErrors,
};
