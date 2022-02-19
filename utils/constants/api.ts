export enum QueryPath {
  login = 'login',
  logout = 'logout',
  students = 'students',
}

export enum ActionPath {
  get = 'get',
  post = 'post',
}

export interface Paginator {
  page: number;
  limit: number;
}
