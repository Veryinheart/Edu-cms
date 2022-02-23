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
export interface LoginRequest {
  role: string;
  email: string;
  password: string;
}
