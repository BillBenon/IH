import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { DEFAULT_TOKEN } from 'utils/constants';
import { addAuthHeader } from './addAuthHeader';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URLEVALUATIONTALK_TO_EXPERT,
});



http.defaults.headers.post['Content-Type'] = 'application/json';

addAuthHeader(http)

http.interceptors.response.use(
  async (response: AxiosResponse): Promise<any> => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  },
  (error: AxiosError) => {
    const {
      response,
      request,
    }: { response?: AxiosResponse; request?: XMLHttpRequest } = error;
    if (response) {
      if (response.status >= 400 && response.status < 500) {
        toast.error(response.data?.output);
        return null;
      }
    } else if (request) {
      toast.error('Request failed. Please try again. ');
      return null;
    }
    return Promise.reject(error);
  }
);

export const post = async (path: string, body = {}) => {
  try {
    (body as any)['token'] = DEFAULT_TOKEN;
    return http.post(path, body);
  } catch (err) {
    console.log(err);
  }
};
