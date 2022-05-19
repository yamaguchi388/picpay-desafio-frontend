import { ResponseError } from "../ResponseError";

export type AsyncState<R = unknown, E = ResponseError> = {
  data: R;
  loading: boolean;
  error: E;
};

export type AsyncFn<R, T = unknown> = (...args: T[]) => Promise<R>;

export type AsyncStateFn<R, E, Args extends unknown[]> = (
  state: AsyncState<R, E>,
  ...args: Args
) => void;
