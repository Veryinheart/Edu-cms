import { QueryPath } from './../../constants/api';
import { IApiClient } from '../apiClient';
import { API_URL, IResponse } from '../apiConfig';
import { LoginRequest, LoginResponse } from './types';
import { AES } from 'crypto-js';
export interface IUserApiClient {
  logout(): Promise<IResponse<boolean> | undefined>;
  login(param: LoginRequest): Promise<IResponse<LoginResponse> | undefined>;
}

export class UserApiClient implements IUserApiClient {
  apiBase: string;
  userApiClient: IApiClient;

  constructor(userApiClient: IApiClient) {
    this.apiBase = API_URL;
    this.userApiClient = userApiClient;
  }

  async login({ password, ...rest }: LoginRequest): Promise<IResponse<LoginResponse> | undefined> {
    try {
      return await this.userApiClient.post(`${this.apiBase}/${QueryPath.login}`, {
        password: AES.encrypt(password, 'cms').toString(),
        ...rest,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<IResponse<boolean> | undefined> {
    try {
      return await this.userApiClient.post(`${this.apiBase}/${QueryPath.logout}`, {});
    } catch (error) {
      console.log(error);
    }
  }
}

export class UserService {
  userApiClient: IUserApiClient;

  constructor(userApiClient: IUserApiClient) {
    this.userApiClient = userApiClient;
  }

  async logout(): Promise<IResponse<boolean> | undefined> {
    return this.userApiClient.logout();
  }
  async login(param: LoginRequest): Promise<IResponse<LoginResponse> | undefined> {
    return this.userApiClient.login(param);
  }
}
