export enum Role {
  student = 'student',
  teacher = 'teacher',
  manager = 'manager',
}

export interface LoginFormValues {
  role: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  role: Role;
  token: string;
  userId: string;
}
