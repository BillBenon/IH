import { clearBrowserStorage } from 'services/browserStorageService';
import { Candidate_Id, Candidate_Track_Id, Company_Partner, Expert_Login, Flowtype, Product_Id, Track_Id, Authorization_Token } from 'utilities/constants';

export const ACTION_LOGOUT_USER = 'LogoutUser'

export const getLogoutAction = () => { return { type: ACTION_LOGOUT_USER } };

const logoutReducer = (state: any, action: { type: string }) => {
    switch (action.type) {
        case ACTION_LOGOUT_USER:
            /**
             * send only that state you need to retain on logout
             */
            clearBrowserStorage(Candidate_Id);
            clearBrowserStorage(Candidate_Track_Id);
            clearBrowserStorage(Flowtype);
            clearBrowserStorage(Product_Id);
            clearBrowserStorage(Expert_Login);
            clearBrowserStorage(Track_Id);
            clearBrowserStorage(Company_Partner);
            clearBrowserStorage(Authorization_Token);
            state = undefined;
    }

    return state;
}

export default logoutReducer;