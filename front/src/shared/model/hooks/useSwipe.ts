import { useEffect, useRef } from 'react';

import { Direction } from '../enums';

const SWIPE_THRESHOLD = 25;
const TAP_MAX_THRESHOLD = 10;
const TAP_MAX_DURATION = 250;

export const useSwipe = (
  onSwipe: (dir: Direction) => void,
  onTap?: () => void
) => {
  const touchStart = useRef<null | { time: number; x: number; y: number }>(
    null
  );

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const [touch] = e.touches;

      touchStart.current = {
        time: Date.now(),
        x: touch.clientX,
        y: touch.clientY
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) {
        return;
      }

      const [touch] = e.changedTouches;

      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const duration = Date.now() - touchStart.current.time;

      // Tap
      if (distance < TAP_MAX_THRESHOLD && duration < TAP_MAX_DURATION) {
        onTap?.();
        touchStart.current = null;

        return;
      }

      // Swipe
      if (Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(dy) > SWIPE_THRESHOLD) {
        if (Math.abs(dx) > Math.abs(dy)) {
          onSwipe(dx > 0 ? Direction.Right : Direction.Left);
        } else {
          onSwipe(dy > 0 ? Direction.Down : Direction.Up);
        }
      }

      touchStart.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, {
      passive: true
    });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipe, onTap]);
};
