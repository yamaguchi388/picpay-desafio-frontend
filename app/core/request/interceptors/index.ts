import { AxiosRequestConfig } from "axios";
import { IAuthInterceptorCache } from "./types";

const AUTH_HEADER = "Authorization";

const cache: Partial<IAuthInterceptorCache> = {};

export const authInterceptor = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  if (cache.token && !config.headers![AUTH_HEADER]) {
    config.headers![AUTH_HEADER] = `Bearer ${cache.token}`;
  }
  return config;
};
