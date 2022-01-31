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
