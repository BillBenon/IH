import { stringify } from 'querystring';
import { pickBy, identity } from 'lodash';
import store from '../store';
import { logout } from '../store/auth';
import { authService } from '../services';
import { API_TIMEOUT, BASE_API_URL, PPP_API_URL } from './constants';
import { logClientErrors } from 'store/evaluationPlatform';
import { getValueBrowserStorage } from 'services/browserStorageService';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiError {
  code: number;
  message: string;
  body: any;
  constructor(code: number, message: string, body: any) {
    this.code = code;
    this.message = message;
    this.body = body;
  }
}
Object.setPrototypeOf(ApiError, Error);

const http = axios.create({ timeout: 50000, timeoutErrorMessage: API_TIMEOUT.message });
http.defaults.headers.post['Content-Type'] = 'application/json';

http.interceptors.request.use(
  (request: AxiosRequestConfig) : any => {
    const authorizationToken = getValueBrowserStorage('authorizationToken');
    if(authorizationToken) request.headers.Authorization = authorizationToken ? `Bearer ${authorizationToken}` : null;
    return request;
  },
  (error: AxiosError) : Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse): any => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  },
  (error: AxiosError) => {
    const {
      response
    }: { response?: AxiosResponse; } = error;
    if (response) {
      if (response.status === 401 || response.status === 403) {
        authService.removeAuthFromStorage();
        store.dispatch(logout());
        window.location.href = '/login';
      }
      
      if (response.data instanceof ArrayBuffer) {
        // @ts-ignore
        const decodedString = String.fromCharCode.apply(null, new Uint8Array(response.data)) 
        const errorObject = JSON.parse(
          decodedString
        );
        logClientErrors({ errorMessage: errorObject.apiMessage, remarks: `API Error - ${response.config.url}`, stackTrace: JSON.stringify(error?.config) })
        return Promise.reject(new ApiError(response.status, errorObject.apiMessage, response.statusText));
      }
      logClientErrors({ errorMessage: response.data.apiMessage, remarks: `API Error - ${response.config.url}`, stackTrace: JSON.stringify(error?.config) })
      
      return Promise.reject(new ApiError(response.status, response.data.apiMessage, response.statusText));
    } else if (error.message == API_TIMEOUT.message) {
      return Promise.reject(new ApiError(API_TIMEOUT.code, API_TIMEOUT.message, ''));
    }
  }
);

export function request(path: string, opts: any = {}, isPPP = false, responseType = undefined): Promise<any> {
  const fullPath = isPPP ? `${PPP_API_URL}/${path}` : `${BASE_API_URL}/${path}`
  switch (opts.method) {
    case 'GET': return http.get(fullPath);
    case 'POST':return http.post(fullPath, opts.body, responseType);
    case 'PUT': return http.put(fullPath, opts.body);
    case 'DELETE': return http.delete(fullPath);
    default: return Promise.reject('Unrecognized method call');
  }
}

export function get(path: string, params = {}, opts = {}, isPPP = false) {
  const search = stringify(pickBy(params, identity));
  return request(`${path}?${search}`, {
    method: 'GET',
    ...opts,
  }, isPPP);
}

export function post(path: string, body = {}, opts = {}, isPPP = false, responseType: any = undefined) {
  const payload: any = {
    method: 'POST',
    body: JSON.stringify(body),
    ...opts,
  };
  if(responseType){
    responseType = responseType;
  }
  return request(path, payload, isPPP, responseType);
}

export function put(path: string, body = {}, opts = {}) {
  return request(path, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...opts,
  });
}

export function del(path: string, params = {}, opts = {}) {
  const search = stringify(params);
  return request(`${path}?${search}`, {
    method: 'DELETE',
    ...opts,
  });
}

function getUrlEncodedString(obj: any) {
  var formBody = [];
  for (var property in obj) {
    let encodedKey = encodeURIComponent(property);
    if (Array.isArray((obj)[property])) {
      let arrayFormBody: string[] = [];
      (obj as any)[property].forEach((id: string) => {
        let encodedV = encodeURIComponent(id);
        arrayFormBody.push(encodedKey + "=" + encodedV);
      })
      formBody.push(arrayFormBody.join("&"));
    }
    else {
      var encodedValue = encodeURIComponent((obj as any)[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
  }
  return formBody.join("&");
}