import { QueryPath } from '../../constants/api';
import { getParamRequest } from '../request';
import { IResponse } from '../apiConfig';

interface GetCourseRequest {
  page: number;
  limit: number;
}

export interface CourseListResponse {
  courses: CourseList[];
  paginator: { page: number; limit: number };
  total: number;
}

export interface CourseList {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  cover: string;
  detail: string;
  duration: number;
  durationUnit: number;
  maxStudents: number;
  name: string;
  price: number;
  uid: string;
  star: number;
  startTime: Date;
  status: number;
  scheduleId: number;
  teacherId: number;
  type: Type[];
  teacherName: string;
}
export interface Type {
  id: number;
  name: string;
}

export interface CourseDetailType {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  cover: string;
  detail: string;
  duration: number;
  durationUnit: number;
  maxStudents: number;
  name: string;
  price: number;
  uid: string;
  star: number;
  startTime: Date;
  status: number;
  scheduleId: number;
  teacherId: number;
  teacher: Teacher;
  schedule: Schedule;
  type: Type[];
  sales: Sales;
  teacherName: string;
}

export interface Sales {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  batches: number;
  price: number;
  earnings: number;
  paidAmount: number;
  studentAmount: number;
  paidIds: number[];
}

export interface Schedule {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  status: number;
  current: number;
  classTime: string[];
  chapters: Chapter[];
}

export interface Chapter {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  order: number;
  content: string;
}

export interface Teacher {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  country: string;
  courseAmount: number;
  email: string;
  name: string;
  phone: string;
  profileId: number;
}

const path = QueryPath.courses;

export const getCourses = (
  req: GetCourseRequest
): Promise<IResponse<CourseListResponse> | undefined> => {
  // console.log(req);
  return getParamRequest<IResponse<CourseListResponse>>(path, req);
};

export const getCourseDetailById = (
  id: number | string | string[] | undefined
): Promise<IResponse<CourseDetailType> | undefined> => {
  return getParamRequest<IResponse<CourseDetailType> | undefined>(`${path}/detail`, { id: id });
};
