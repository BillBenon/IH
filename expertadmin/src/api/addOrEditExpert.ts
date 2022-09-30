import { post } from 'api';
import {
    GetExpertDetailRequest,
    UpdateExpertRequest,
    CreateExpertRequest,
} from 'types';
import { API } from 'utils/constants';

const {
    GETEXPERTDETAIL,
    UPDATEEXPERTDETAIL,
    ADDEXPERT,
} = API;

const getExpertDetail = (payload: GetExpertDetailRequest) => {
    return post(GETEXPERTDETAIL, payload);
};

const editExpert = (payload: UpdateExpertRequest) => {
    return post(UPDATEEXPERTDETAIL, payload);
};

const createExpert = (payload: CreateExpertRequest) => {
    return post(ADDEXPERT, payload);
};

export const addOrEditExpert = {
    getExpertDetail,
    editExpert,
    createExpert,
};
