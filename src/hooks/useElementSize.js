import useResizeObserver from '@react-hook/resize-observer';
import { useLayoutEffect, useState } from 'react';

export const useElementSize = (target) => {
  const [ size, setSize ] = useState();

  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [ target ]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};
