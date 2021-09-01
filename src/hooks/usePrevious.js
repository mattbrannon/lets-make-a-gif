import { useRef, useEffect } from 'react';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [ value ]);
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
