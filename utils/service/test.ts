import ApiClient from './apiClient';
import { ApiConfiguration } from './apiConfig';
import Storage from './storage';

const studentApiConfig = new ApiConfiguration();
studentApiConfig.token = Storage.token;

const studentApiClient = new ApiClient(new ApiClient(studentApiConfig));
