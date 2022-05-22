import { AxiosInstance } from "axios";

export type RequestObject = {
  instance: AxiosInstance;
  interceptors: Record<string, number> | null;
};
