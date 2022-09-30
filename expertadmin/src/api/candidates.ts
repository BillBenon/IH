import { post } from 'api';
import { post as pppPost } from 'api/pppserviceApi';
import { GetCandidateAuthorizationTokenRequest, GetCandidateRequest, UpdateCandidatePlan } from 'types';
import { API } from 'utils/constants';

const getCandidatesAssociatedByExpert = (payload: GetCandidateRequest) => {
    return post(API.GETCANDIDATESASSOCIATEDEXPERT, payload);
};
const getUpdateCandidatePlan = (payload: UpdateCandidatePlan) => {
    return pppPost(API.UPDATECANDIDATEPLAN, payload);
}

const getCandidateAuthorizationToken = (payload: GetCandidateAuthorizationTokenRequest) => {
    return post(API.GETCANDIDATEAUTHTOKEN, payload);
};

export const candidates = {
    getCandidatesAssociatedByExpert,
    getUpdateCandidatePlan,
    getCandidateAuthorizationToken
};
