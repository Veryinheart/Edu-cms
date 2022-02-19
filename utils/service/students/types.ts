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
}

export interface StudentWithProfile extends Student<CourseType>, StudentProfile {}

export type StudentResponse = StudentWithProfile;

export interface BaseType {
  id: number;
  name: string;
}
