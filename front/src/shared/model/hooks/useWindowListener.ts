import { useEffect } from 'react';

interface IUseWindowListener {
  isCallImmediately?: boolean;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  listener: (...args: any[]) => any;
  options?: AddEventListenerOptions | boolean;
  type: string;
}

export const useWindowListener = ({
  isCallImmediately,
  listener,
  options,
  type
}: IUseWindowListener) => {
  useEffect(() => {
    if (isCallImmediately) {
      listener();
    }
    window.addEventListener(type, listener, options);

    return () => {
      window.removeEventListener(type, listener, options);
    };
  }, [isCallImmediately, listener, options, type]);
};
