import axios from "axios";

export const removeHeader = (headerKey: string) => {
  delete axios.defaults.headers[headerKey];
};

export const setHeaders = (headers: Record<string, string>) => {
    axios.defaults.headers = {
    ...axios.defaults.headers,
    ...headers,
  };
};

export const addInterceptor = (callback: (status: number) => void) => {
    axios.interceptors.response.use(
    (response) => response,
    (error) => {
      callback(error.response.status);
      throw error;
    }
  );
};
