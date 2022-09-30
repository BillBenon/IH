import { detect } from 'detect-browser';
import { identity, pickBy } from 'lodash';
import publicIp from 'public-ip';
import { stringify } from 'querystring';

import { ExpertDetail } from '../containers/Login/ILogin';
import BrowserCacheService from '../services/browser-cache';
import { errorService } from '../services/errorHandler';
import { ErrorContainer } from '../types/Error';
import { ApplicationType, BASE_API_URL, DEFAULT_TOKEN, ErrorType, PASS_ERRORS } from './constants';

// import { logout } from '../store/auth';
interface IException {
  apiMessage: string,
  apiStatus: string,
}

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

export async function handleResponse(response: any) {
  const statusCode = response.status;
  if (statusCode < 400) {
    return response.json();
  }

  return response
    .json()
    .catch(() => null)
    .then((body: IException) => {
      if (statusCode === 401) {
        BrowserCacheService.removeItem('auth');
        window.location.href = '/login';
      }

      if(PASS_ERRORS.includes(body.apiMessage)){
        return {
          output: body.apiMessage,
          error: true
        }
      }

      logError({ message: body.apiMessage, name: statusCode, stack: body.apiStatus })
      throw new ApiError(statusCode, body.apiMessage, body.apiStatus);
    });
}

export async function request(path: string, opts = {}) {
  const auth: any = await BrowserCacheService.getItem("auth");
  const headers = {
    "Content-Type": "application/json",
    Authorization:
      auth?.authorizationToken && `Bearer ${auth.authorizationToken}`,
  };

  return fetch(`${BASE_API_URL}/${path}`, {
    mode: 'cors',
    headers,
    ...opts,
  }).then(handleResponse);
}

export function get(path: string, params = {}, opts = {}) {
  const search = stringify(pickBy(params, identity));
  return request(`${path}?${search}`, {
    method: 'GET',
    ...opts,
  });
}

export function post(path: string, body = {}, opts = {}) {
  return request(path, {
    method: 'POST',
    body: JSON.stringify(body),
    ...opts,
  });
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

export function logError(error: Error) {
  const browser = detect();
  BrowserCacheService.getItem("auth", (value: ExpertDetail | undefined) => {
    publicIp.v4().then((ipaddress: string) => {
      let errorinfo: ErrorContainer = {
        token: DEFAULT_TOKEN,
        userId: value?.expertId,
        applicationType: ApplicationType.EXPERT,
        errorType: ErrorType.CLIENT,
        errorMessage: error.message,
        stackTrace: error.stack,
        remarks: error.name,
        browserInfo: browser?.name,
        ipAddress: ipaddress
      }
      errorService.logClientErrors(errorinfo).then(res => {
        console.log("error logged successfully")
      });
    });
  });
}
