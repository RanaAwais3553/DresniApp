import {useCallback, useEffect} from 'react';

export const useDebouncedEffect = (effect, delay, deps) => {
  console.log('useDebouncedEffect in utilities is:!...', effect, delay, deps);
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
};
