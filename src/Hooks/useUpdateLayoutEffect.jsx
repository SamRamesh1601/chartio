import {useLayoutEffect, useRef} from 'react';

export default function useUpdateLayoutEffect(callback, dependencies) {
  const firstRenderRef = useRef(true);
  useLayoutEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
}
