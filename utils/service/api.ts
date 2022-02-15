import axios from 'axios';
import { API_URL } from '../constants/api-path';
import Storage from '../service/storage';

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
