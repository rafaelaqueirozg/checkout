import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export interface HttpService {
  get: <T>(url: string, params?: object) => Promise<T>;
  post: <T>(url: string, data: object) => Promise<T>;
}

const createHttpService = (baseURL: string): HttpService => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleRequest = async <T>(requestFn: () => Promise<AxiosResponse<T>>): Promise<T> => {
    try {
      const response = await requestFn();
      return response.data;
    } catch (error: unknown) {
      throw (error as AxiosError).response?.data ?? error;
    }
  };

  const get = async <T>(url: string, params?: object): Promise<T> => {
    return await handleRequest(async () => await axiosInstance.get<T>(url, { params }));
  };

  const post = async <T>(url: string, data: object): Promise<T> => {
    return await handleRequest(async () => await axiosInstance.post<T>(url, data));
  };

  return { get, post };
};

export default createHttpService;
