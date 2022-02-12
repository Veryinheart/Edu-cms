export interface Student {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
  country: string;
  email: string;
  courses: CourseType[];
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
