import { debounce } from "lodash";
import { useCallback } from "react";
type DebouncedFunction<T extends any[]> = (...args: T) => void;
const useDebouncedCallback = <T extends any[]>(
  callback: DebouncedFunction<T>,
  delay = 400
) => {
  // eslint-disable-next-line
  const debouncedCallback = useCallback(debounce(callback, delay), [
    callback,
    delay,
  ]);
  return debouncedCallback;
};
export default useDebouncedCallback;
