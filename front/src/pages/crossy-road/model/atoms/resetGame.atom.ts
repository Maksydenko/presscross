import { atom } from 'jotai';

import { getPropertyValue, Time } from '@/shared/model';

import { gameStateAtom } from './gameState.atom';
import { resetPositionXAtom } from './positionX.atom';
import { resetRowsAtom } from './rows.atom';

export const resetGameAtom = atom(null, (_, set) => {
  const loaderTime = getPropertyValue('--crossyRoadLoaderTime');

  set(gameStateAtom, prev => ({
    ...prev,
    isLoading: true
  }));

  setTimeout(
    () => {
      set(resetPositionXAtom);
      set(resetRowsAtom);
      set(gameStateAtom, prev => ({
        ...prev,
        isEnded: false,
        resetCount: ++prev.resetCount
      }));
    },
    (loaderTime / 2) * Time.MillisecondsInSecond
  );
});
