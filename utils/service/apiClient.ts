import Axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from './apiConfig';
import { getToken } from './storage';

// enum StatusCode {
//   Unauthorized = 401,
//   Forbidden = 403,
//   TooManyRequests = 429,
//   InternalServerError = 500,
// }

const instance = Axios.create({
  baseURL: API_URL,
  timeout: 10 * 1000,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    try {
      const token = getToken();
      if (token !== null && config.headers !== undefined) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error: unknown) {
      console.log(error);
    }
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.message);
  }
);

export default instance;
