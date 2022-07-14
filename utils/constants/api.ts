export enum QueryPath {
  login = 'login',
  logout = 'logout',
  students = 'students',
  statistics = 'statistics',
  overview = 'overview',
  courses = 'courses',
  teachers = 'teachers',
}

export enum ActionPath {
  get = 'get',
  post = 'post',
}

export interface Paginator {
  page: number;
  limit: number;
}
