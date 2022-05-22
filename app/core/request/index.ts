import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { authInterceptor } from "./interceptors";
import { RequestObject } from "./types";

export const create = (
  customConfig: AxiosRequestConfig,
  intercept = true
): RequestObject => {
  const config = {
    ...customConfig,
    headers: {
      "Content-Type": "application/json",
      ...customConfig.headers,
    },
  };

  const instance: AxiosInstance = axios.create(config);
  const interceptors = intercept
    ? { authInterceptor: instance.interceptors.request.use(authInterceptor) }
    : null;

  return { instance, interceptors };
};
