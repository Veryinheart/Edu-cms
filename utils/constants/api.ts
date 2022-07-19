export enum QueryPath {
  login = 'login',
  logout = 'logout',
  students = 'students',
  statistics = 'statistics',
  overview = 'overview',
  courses = 'courses',
  teachers = 'teachers',
  messages = 'message',
}

export enum ActionPath {
  get = 'get',
  post = 'post',
}

export interface Paginator {
  page: number;
  limit: number;
}
