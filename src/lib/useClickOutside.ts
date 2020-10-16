import { useEffect } from 'react';

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      console.log('current', ref.current);
      console.log('target', event.target);
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
