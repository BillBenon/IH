import { Candidate_Id, Candidate_Track_Id, Company_Partner, Expert_Login, Flowtype, Product_Id, Track_Id, Authorization_Token } from 'utilities/constants';
import { post } from '../utilities';
import { clearBrowserStorage, getValueBrowserStorage, setValueBrowserStorage } from './browserStorageService';

const login = (email: string, password: string) => {
  const user = { email, password };
  return post('login', { user });
};

const signup = (user: any) => {
  return post('signup', user);
};

const setAuthInStorage = (userAuth: any) => {
  setValueBrowserStorage('auth', JSON.stringify(userAuth));
};

const getAuthFromStorage = () => {
  try {
    return JSON.parse(getValueBrowserStorage('auth') || '');
  } catch (err: any) {
    return null;
  }
};

const removeAuthFromStorage = () => {
  clearBrowserStorage(Candidate_Id);
  clearBrowserStorage(Candidate_Track_Id);
  clearBrowserStorage(Flowtype);
  clearBrowserStorage(Product_Id);
  clearBrowserStorage(Expert_Login);
  clearBrowserStorage(Track_Id);
  clearBrowserStorage(Company_Partner);
  clearBrowserStorage(Authorization_Token);
};

export const authService = {
  login,
  signup,
  setAuthInStorage,
  getAuthFromStorage,
  removeAuthFromStorage,
};
