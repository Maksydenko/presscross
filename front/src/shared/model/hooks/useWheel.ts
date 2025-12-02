import { useEffect } from 'react';

export const useWheel = (onScroll: (deltaY: number) => void) => {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      onScroll(e.deltaY);
    };

    window.addEventListener('wheel', handleWheel, {
      passive: true
    });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [onScroll]);
};
