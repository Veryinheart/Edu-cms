export interface LoginResponse {
  token: string;
  role: Role;
  userId: string;
}
export enum Role {
  student = 'student',
  teacher = 'teacher',
  manager = 'manager',
}

export enum UserId {
  'student' = 1,
  'teacher' = 2,
  'manager' = 3,
}
export interface LoginRequest {
  role: string;
  email: string;
  password: string;
}
