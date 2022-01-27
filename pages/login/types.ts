export enum Role {
  student = 'student',
  teacher = 'teacher',
  manager = 'manager',
}

export interface LoginForm {
  role: string;
  email: string;
  password: string;
}
