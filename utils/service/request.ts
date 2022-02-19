import ApiClient from './apiClient';
import { ApiConfiguration } from './apiConfig';
import Storage from './storage';
import { StudentApiClient, StudentService } from './students/StudentService';
const studentApiConfig = new ApiConfiguration();

studentApiConfig.token = Storage.token;

const studentApiClient = new StudentApiClient(new ApiClient(studentApiConfig));

export const studentService = new StudentService(studentApiClient);
