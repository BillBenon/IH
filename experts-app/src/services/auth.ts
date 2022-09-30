import { IChangePassword } from '../containers/ChangePassword/IChangePassword';
import { ExpertDetail, LastActivity } from '../containers/Login/ILogin';
import { CandidateRequestLogin } from '../types/CandidateLoginRequest';
import { ExpertRequestLogin } from '../types/ExpertLoginRequest';
import { CreateHiringManager } from '../types/CreateHiringManager';
import { post } from '../utilities';
import { API_URL_PREFIX, DEFAULT_TOKEN } from '../utilities/constants';

const login = (payload: ExpertRequestLogin | CandidateRequestLogin) => {
  return post(`${API_URL_PREFIX}/login`, payload);
};

const signup = (payload: CreateHiringManager) => {
  return post(`${API_URL_PREFIX}/createHiringManager`, payload);
};

const saveLastActivity = (payload: LastActivity) => {
  return post(`${API_URL_PREFIX}/saveLastActivities`, payload);
}

const changePassword = (payload: IChangePassword) => {
  return post(`${API_URL_PREFIX}/changePassword`, payload);
}

const getExpertDetails = (expertId: string) => {
  return post(`${API_URL_PREFIX}/getExpertDetails`, { expertId, token: DEFAULT_TOKEN });
}

const updateExpert = (payload: ExpertDetail) => {
  return post(`${API_URL_PREFIX}/updateExpert`, { ...payload, token: DEFAULT_TOKEN });
}

const getMarketsForLogin = () => {
  return post(`${API_URL_PREFIX}/getMarkets`, { token: DEFAULT_TOKEN });
};

export const authService = {
  login,
  signup,
  saveLastActivity,
  changePassword,
  getExpertDetails,
  updateExpert,
  getMarketsForLogin
};
