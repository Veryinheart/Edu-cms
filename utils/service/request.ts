import myAxios from './apiClient';

export function getParamRequest<T>(path: string, params: unknown) {
  return new Promise<T>((resolve, reject) => {
    myAxios
      .get(path, { params: params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getUrlRequest<T>(path: string, params: unknown) {
  return new Promise<T>((resolve, reject) => {
    myAxios
      .get(`${path}/${params}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function postRequest<T>(path: string, params?: unknown) {
  return new Promise<T>((resolve, reject) => {
    myAxios
      .post(path, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function putRequest<T>(path: string, params: unknown) {
  return new Promise<T>((resolve, reject) => {
    myAxios
      .put(path, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function deleteRequest<T>(path: string, params: unknown) {
  return new Promise<T>((resolve, reject) => {
    myAxios
      .delete(`${path}/${params}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
