import { QueryPath } from './../constants/api';
import { deleteRequest, getParamRequest, getUrlRequest, postRequest, putRequest } from './1request';
import { IResponse } from './apiConfig';

interface getStudentRequest {
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

//success
export function getStudents(req: getStudentRequest): Promise<IResponse<StudentList> | undefined> {
  // console.log(req);
  return getParamRequest<IResponse<StudentList>>(path, req);
}

export function findStudentById(id: string): Promise<IResponse<StudentWithProfile> | undefined> {
  return getUrlRequest<IResponse<StudentWithProfile> | undefined>(path, id);
}

export function findStudentByName(
  param: getStudentRequest
): Promise<IResponse<StudentList> | undefined> {
  return getParamRequest<IResponse<StudentList> | undefined>(path, param);
}
// 类型错误 TS 查阅类型文档 找问题！

export function AddStudent(
  param: AddStudentRequest
): Promise<IResponse<AddStudentResponse> | undefined> {
  console.log(param);
  return postRequest<IResponse<AddStudentResponse> | undefined>(path, param);
}
export function UpdateStudent(
  param: UpdateStudentRequest
): Promise<IResponse<Student> | undefined> {
  console.log(param);
  return putRequest<IResponse<Student>>(path, param);
}

//success
export function deleteStudent(id: number): Promise<IResponse<boolean>> {
  return deleteRequest<IResponse<boolean>>(path, id);
}
