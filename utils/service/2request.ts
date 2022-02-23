import ApiClient from './2apiClient';
import { ApiConfiguration } from './2apiConfig';
import Storage from './storage';
import { StudentApiClient, StudentService } from './students/2studentService';

const studentApiConfig = new ApiConfiguration();

studentApiConfig.token = Storage.token;

const studentApiClient = new StudentApiClient(new ApiClient(studentApiConfig));

// const userApiClient = new UserApiClient(new ApiClient())
export const studentService = new StudentService(studentApiClient);
