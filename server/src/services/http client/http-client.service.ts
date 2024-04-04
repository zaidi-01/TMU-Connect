import axios, { AxiosPromise } from 'axios';

// Base URL for API
const BASE_URL = 'http://localhost:8000/api/docs';

export default class HttpService {
  //GET requests
  public static get<T>(url: string): AxiosPromise<T> {
    return axios.get(`${BASE_URL}${url}`);
  }

  // POST requests
  public static post<T>(url: string, data: any): AxiosPromise<T> {
    return axios.post(`${BASE_URL}${url}`, data);
  }

  //PUT requests
  public static put<T>(url: string, data: any): AxiosPromise<T> {
    return axios.put(`${BASE_URL}${url}`, data);
  }

  // DELETE requests
  public static delete<T>(url: string): AxiosPromise<T> {
    return axios.delete(`${BASE_URL}${url}`);
  }

  //PATCH requests
  public static patch<T>(url: string, data: any): AxiosPromise<T> {
    return axios.patch(`${BASE_URL}${url}`, data);
  }
}
