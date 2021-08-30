import { forwardRef, useEffect, useReducer, useCallback, useState } from 'react';

// export const useResizeObserver = () => {
//   const [ size, setSize ] = useState(null);
//   const ref = useCallback((node) => {
//     if (node !== null) {
//       setSize(node.getBoundingClientRect());
//     }
//     return [ size, ref ];
//   }, []);

export const useResizeObserver = () => {
  const [ size, setSize ] = useState({ width: 0, height: 0 });
  const [ isObserving, setIsObserving ] = useState(false);
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.contentBoxSize) {
        // Firefox implements `contentBoxSize` as a single content rect, rather than an array
        const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
        setSize({ width: contentBoxSize.inlineSize, height: contentBoxSize.blockSize });
      }
    }
  });

  const ref = useCallback((node) => {
    if (node !== null && !isObserving) {
      resizeObserver.observe(node);
      setIsObserving(true);
    }
  });
  return [ size, ref ];
};
