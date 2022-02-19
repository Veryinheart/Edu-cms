import { QueryPath } from './../../constants/api';
import { IApiClient } from '../apiClient';
import { API_URL, IResponse } from '../apiConfig';
import { Student, AddStudentRequest, UpdateStudentRequest, StudentWithProfile } from './types';

export interface IStudentApiClient {
  findStudents(page: number, limit: number): Promise<IResponse<Student[]>> | undefined;
  findStudentById(id: number): Promise<IResponse<StudentWithProfile>> | undefined;
  AddStudent(param: AddStudentRequest): Promise<boolean>;
  UpdateStudent(param: UpdateStudentRequest): Promise<IResponse<Student>>;
}

export class StudentApiClient implements IStudentApiClient {
  apiBase: string;
  studentApiClient: IApiClient;

  constructor(studentApiClient: IApiClient) {
    this.apiBase = API_URL;
    this.studentApiClient = studentApiClient;
  }

  async findStudents(page: number, limit: number): Promise<IResponse<Student[]>> {
    try {
      const response = await this.studentApiClient.get(
        `${this.apiBase}/${QueryPath.students}?page=${page}&limit=${limit}`
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findStudentById(id: number): Promise<IResponse<StudentWithProfile>> {
    try {
      const response = await this.studentApiClient.get(
        `${this.apiBase}/${QueryPath.students}/${id}`
      );
      return response.msg === 'success' ? response : undefined;
    } catch (error) {
      console.log(error);
    }
  }

  async AddStudent(param: AddStudentRequest): Promise<boolean> {
    try {
      await this.studentApiClient.post(`${this.apiBase}/${QueryPath.students}`, param);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async UpdateStudent(param: UpdateStudentRequest): Promise<IResponse<Student>> | undefined {
    try {
      return this.studentApiClient.put(`${this.apiBase}/${QueryPath.students}`, param);
    } catch (error) {
      console.log(error);
    }
  }
}

export class StudentService {
  studentApiClient: IStudentApiClient;

  constructor(studentApiClient: IStudentApiClient) {
    this.studentApiClient = studentApiClient;
  }

  async findStudents(page: number, limit: number): Promise<IResponse<Student[]>> | undefined {
    return this.studentApiClient.findStudents(page, limit);
  }

  async findStudentById(id: number): Promise<IResponse<StudentWithProfile>> | undefined {
    return this.studentApiClient.findStudentById(id);
  }
}
