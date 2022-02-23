import Axios, { AxiosInstance } from 'axios';
import { RequestConfig, ApiConfiguration, API_URL } from './apiConfig';

export interface IApiClient {
  post<TRequest, TResponse>(
    path: string,
    object: TRequest,
    config?: RequestConfig
  ): Promise<TResponse>;

  get<TResponse>(path: string): Promise<TResponse>;
  put<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  delete<TResponse>(path: string): Promise<TResponse>;
}

export default class ApiClient implements IApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(apiConfiguration: ApiConfiguration): AxiosInstance {
    return Axios.create({
      baseURL: API_URL,
      // responseType: 'json' as const,
      headers: {
        ...(apiConfiguration.token && {
          Authorization: `Bearer ${apiConfiguration.token}`,
        }),
      },
      timeout: 10 * 1000,
    });
  }

  constructor(apiConfiguration: ApiConfiguration) {
    this.client = this.createAxiosClient(apiConfiguration);
  }

  async post<TRequest, TResponse>(
    path: string,
    param: TRequest,
    config?: RequestConfig
  ): Promise<TResponse> {
    try {
      const response = config
        ? await this.client.post<TResponse>(path, param, config)
        : await this.client.post<TResponse>(path, param);
      return response.data;
    } catch (error) {
      // handleServiceError(error);
    }
    return {} as TResponse;
    // throw new Error('Method not implemented.');
  }
  async get<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path);
      return response.data;
    } catch (error) {
      // handleServiceError(error);
    }
    return {} as TResponse;
  }

  // throw new Error('Method not implemented.');

  async put<TRequest, TResponse>(path: string, param: TRequest): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, param);
      return response.data;
    } catch (error) {
      // handleServiceError(error);
    }
    return {} as TResponse;
    // throw new Error('Method not implemented.');
  }
  async delete<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path);
      return response.data;
    } catch (error) {
      // handleServiceError(error);
    }
    return {} as TResponse;
  }
  // throw new Error('Method not implemented.');
}
