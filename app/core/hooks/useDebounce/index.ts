/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, DependencyList } from "react";

export const useDebounceFn = (
  func: (...args: any) => void,
  wait: number,
  deps: DependencyList = []
): ((...args: any) => void) => {
  const timeoutId = useRef(null) as any;
  useEffect(() => () => clearTimeout(timeoutId.current), []);

  return useCallback((...args: any) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => func(...args), wait);
  }, deps);
};

export default useDebounceFn;
