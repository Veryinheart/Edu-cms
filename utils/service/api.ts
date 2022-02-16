import axios, { AxiosInstance } from 'axios';
import { API_URL } from '../constants/api-path';
import Storage from '../service/storage';

export type HttpHeaders = {
  [key: string]: string;
};

export type RequestConfig = {
  headers: HttpHeaders;
};
const token = Storage.token;
export const axiosNoToken = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const axiosWithToken = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { 'Authorization': `Bearer ${token}` },
});

export interface ApiClient {
  post<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: RequestConfig
  ): Promise<TResponse>;

  get<TResponse>(path: string): Promise<TResponse>;
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
}
