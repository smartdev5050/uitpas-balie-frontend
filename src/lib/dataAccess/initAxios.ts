import axios from "axios";

axios.defaults.baseURL = process.env["NEXT_PUBLIC_API_PATH"];

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
