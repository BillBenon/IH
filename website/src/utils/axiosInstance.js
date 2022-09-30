import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL_DRIP,
  timeout: 10000
});

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

http.defaults.headers.post['Content-Type'] = 'application/json';

http.interceptors.request.use(req => {
  return req;
});

http.interceptors.response.use(
  async (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
  },
  (error) => {
    const {
      response,
      request,
    } = error;
    if (response) {
      if (response.status >= 400 && response.status < 500) {
        // alert(response.data?.output);
        return null;
      }
    } else if (request) {
      alert('Request failed. Please try again.');
      return null;
    }
    return Promise.reject(error);
  }
);

export const post = async (path, body = {}) => {
  try {
    // body["token"] = DEFAULT_TOKEN;
    return http.post(path, body);
  } catch (err) {
    console.log(err);
  }
}

export const get = async (path, body = {}) => {
  try {
    // body["token"] = DEFAULT_TOKEN;
    return http.get(path, body);
  } catch (err) {
    console.log(err);
  }
}