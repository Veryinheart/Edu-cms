import { QueryPath } from '../../constants/api';
import { IApiClient } from '../apiClient';
import { API_URL, IResponse } from '../apiConfig';
import {
  Student,
  AddStudentRequest,
  UpdateStudentRequest,
  StudentWithProfile,
  StudentList,
  AddStudentResponse,
} from './types';

export interface IStudentApiClient {
  findStudents(page: number, limit: number): Promise<IResponse<StudentList> | undefined>;
  findStudentById(id: string): Promise<IResponse<StudentWithProfile> | undefined>;
  addStudent(param: AddStudentRequest): Promise<IResponse<AddStudentResponse> | undefined>;
  updateStudent(param: UpdateStudentRequest): Promise<IResponse<Student> | undefined>;
  deleteStudent(id: number): Promise<IResponse<boolean> | undefined>;
}

export class StudentApiClient implements IStudentApiClient {
  apiBase: string;
  studentApiClient: IApiClient;

  constructor(studentApiClient: IApiClient) {
    this.apiBase = API_URL;
    this.studentApiClient = studentApiClient;
  }

  async findStudents(page: number, limit: number): Promise<IResponse<StudentList> | undefined> {
    try {
      return await this.studentApiClient.get(
        `${this.apiBase}/${QueryPath.students}?page=${page}&limit=${limit}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  async findStudentById(id: string): Promise<IResponse<StudentWithProfile> | undefined> {
    try {
      return await this.studentApiClient.get(`${this.apiBase}/${QueryPath.students}/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async addStudent(param: AddStudentRequest): Promise<IResponse<AddStudentResponse> | undefined> {
    try {
      return await this.studentApiClient.post(`${this.apiBase}/${QueryPath.students}`, param);
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(param: UpdateStudentRequest): Promise<IResponse<Student> | undefined> {
    try {
      return this.studentApiClient.put(`${this.apiBase}/${QueryPath.students}`, param);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteStudent(id: number): Promise<IResponse<boolean> | undefined> {
    try {
      return this.studentApiClient.delete(`${this.apiBase}/${QueryPath.students}/${id}`);
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

  async findStudents(page: number, limit: number): Promise<IResponse<StudentList> | undefined> {
    return this.studentApiClient.findStudents(page, limit);
  }

  async findStudentById(id: string): Promise<IResponse<StudentWithProfile> | undefined> {
    return this.studentApiClient.findStudentById(id);
  }

  async AddStudent(param: AddStudentRequest): Promise<IResponse<AddStudentResponse> | undefined> {
    return this.studentApiClient.addStudent(param);
  }
  async UpdateStudent(param: UpdateStudentRequest): Promise<IResponse<Student> | undefined> {
    return this.studentApiClient.updateStudent(param);
  }

  async deleteStudent(id: number): Promise<IResponse<boolean> | undefined> {
    return this.studentApiClient.deleteStudent(id);
  }
}
