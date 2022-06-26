import { QueryPath } from '../../constants/api';
import { deleteRequest, getParamRequest, getUrlRequest, postRequest, putRequest } from '../request';
import { IResponse } from '../apiConfig';

interface GetStudentRequest {
  page: number;
  limit: number;
  query?: string;
  userId?: number;
}

export interface Student<T = CourseType> {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
  country: string;
  email: string;
  courses: T[];
  type: { id: number; name: string } | null;
}

export interface StudentList {
  paginator: { page: number; limit: number };
  students: Student[];
  total: number;
}

export interface CourseType {
  id: number;
  courseId: number;
  name: string;
}

export interface AddStudentRequest {
  name: string;
  email: string;
  country: string;
  type: number;
}

export type AddStudentResponse = Student;

export interface UpdateStudentRequest extends AddStudentRequest {
  id: number;
}

export interface StudentProfile {
  id: number;
  name: string;
  country: string;
  email: string;
  address: string;
  phone: number;
  gender: number;
  education: string;
  age: number;
  interest: string[];
  avatar: string;
  memberStartAt: string;
  memberEndAt: string;
  description: string;
  profileId: number;
}

export interface StudentWithProfile extends Student<CourseType>, StudentProfile {}

export type StudentResponse = StudentWithProfile;

export interface BaseType {
  id: number;
  name: string;
}

const path = QueryPath.students;

export const getStudents = (
  req: GetStudentRequest
): Promise<IResponse<StudentList> | undefined> => {
  // console.log(req);
  return getParamRequest<IResponse<StudentList>>(path, req);
};

export const findStudentById = (
  id: string | string[] | undefined
): Promise<IResponse<StudentWithProfile> | undefined> => {
  return getUrlRequest<IResponse<StudentWithProfile> | undefined>(path, id);
};

export const findStudentByName = (
  param: GetStudentRequest
): Promise<IResponse<StudentList> | undefined> => {
  return getParamRequest<IResponse<StudentList> | undefined>(path, param);
};

export const addStudent = (
  param: AddStudentRequest
): Promise<IResponse<AddStudentResponse> | undefined> => {
  return postRequest<IResponse<AddStudentResponse> | undefined>(path, param);
};
export const updateStudent = (
  param: UpdateStudentRequest
): Promise<IResponse<Student> | undefined> => {
  return putRequest<IResponse<Student>>(path, param);
};

export const deleteStudent = (id: number): Promise<IResponse<boolean>> => {
  return deleteRequest<IResponse<boolean>>(path, id);
};
