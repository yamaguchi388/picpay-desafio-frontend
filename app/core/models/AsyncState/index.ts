import { ResponseError } from "../ResponseError";

export type AsyncState<R = unknown, E = ResponseError> = {
  data: R | null;
  loading: boolean;
  error: E | unknown;
};
