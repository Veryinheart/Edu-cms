import { QueryPath } from '../../constants/api';
import { postRequest } from '../request';
import { IResponse } from '../apiConfig';
import { LoginRequest, LoginResponse } from './types';

export function userLogin(param: LoginRequest): Promise<IResponse<LoginResponse> | undefined> {
  const path = QueryPath.login;
  return postRequest<IResponse<LoginResponse> | undefined>(path, param);
}

export function userLogout(): Promise<IResponse<boolean> | undefined> {
  const path = QueryPath.logout;
  return postRequest<IResponse<boolean> | undefined>(path);
}
