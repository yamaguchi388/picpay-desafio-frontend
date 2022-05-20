import { AxiosRequestConfig } from "axios";

const AUTH_HEADER = "Authorization";

interface IAuthInterceptorCache {
  token: string;
}

const cache: Partial<IAuthInterceptorCache> = {};

export const authInterceptor = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  if (cache.token && !config.headers![AUTH_HEADER]) {
    config.headers![AUTH_HEADER] = `Bearer ${cache.token}`;
  }
  return config;
};
