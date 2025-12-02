import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import * as THREE from 'three';

import { gameStateAtom } from '../atoms';
import { IPlayerState } from '../interfaces';

export const useResetPlayer = (
  playerElement: null | THREE.Group<THREE.Object3DEventMap>,
  playerState: IPlayerState
) => {
  const gameState = useAtomValue(gameStateAtom);

  useEffect(
    () => {
      if (!playerElement) {
        return;
      }

      playerElement.position.set(0, 0, 0);
      playerElement.rotation.z = 0;
      playerElement.scale.z = 1;

      playerState.rotation.z = 0;
      playerState.position.x = 0;
      playerState.position.y = 0;
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [gameState.resetCount]
  );
};
