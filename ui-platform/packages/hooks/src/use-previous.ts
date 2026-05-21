import { useRef, useEffect } from 'react';

/**
 * Hook to get the previous value of a state/prop
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
