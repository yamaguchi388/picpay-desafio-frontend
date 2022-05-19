import { SetStateAction, useCallback, useEffect, useState } from "react";

export const useAsyncFn = (
  asyncFunction: (...args: unknown[]) => Promise<any>,
  initFn,
  successFn,
  errorFn,
  immediate = true
) => {
  const execute = useCallback(() => {
    initFn({ data: null, loading: false, error: null });
    return asyncFunction()
      .then((response: SetStateAction<null>) =>
        successFn({ data: response, error: null, loading: false })
      )
      .catch((error: SetStateAction<null>) =>
        errorFn({ data: null, loading: false, error })
      );
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
};
