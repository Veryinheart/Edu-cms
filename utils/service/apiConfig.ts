import Axios from 'axios';
import Storage from './storage';

export const API_URL = 'http://cms.chtoma.com/api';

export type HttpHeaders = {
  [key: string]: string;
};

export type RequestConfig = {
  headers: HttpHeaders;
};
export class ApiConfiguration {
  token?: string;
}

export interface IResponse<T = unknown> {
  code: number;
  msg: string;
  data?: T;
}

const token = Storage.token;

export const axiosNoToken = Axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const axiosWithToken = Axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { 'Authorization': `Bearer ${token}` },
});
