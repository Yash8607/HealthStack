import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  code?: string;
  message?: string;
  timestamp: string;
  path?: string;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    config.headers['Accept'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiResponse>) => {
    const message = error.response?.data?.message || error.message || 'Unknown error occurred';
    return Promise.reject({
      status: error.response?.status,
      message,
      code: error.response?.data?.code,
    });
  }
);

export default apiClient;
