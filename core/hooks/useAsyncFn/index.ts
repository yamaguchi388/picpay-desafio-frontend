import { SetStateAction, useCallback, useEffect, useState } from "react";

export const useAsync = (
  asyncFunction: (...args: unknown[]) => Promise<any>,
  immediate = true
) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setStatus("pending");
    setData(null);
    setError(null);
    return asyncFunction()
      .then((response: SetStateAction<null>) => {
        setData(response);
        setStatus("success");
      })
      .catch((error: SetStateAction<null>) => {
        setError(error);
        setStatus("error");
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, status, data, error };
};
