import { useAtomValue } from 'jotai';

import { Direction, useSwipe, useWindowListener } from '@/shared/model';

import { Tile } from '../../config';

import { gameStateAtom } from '../atoms';
import { IPlayerState } from '../interfaces';
import { checkCanLeapTo } from '../utils';

const MAX_LEAPS_QUEUE = 2;

export const useAddLeap = (playerState: IPlayerState) => {
  const gameState = useAtomValue(gameStateAtom);

  const getTarget = (state: IPlayerState) => {
    let { x, y } = state.position;

    for (const dir of state.leapsQueue) {
      if (dir === Direction.Left) {
        x -= Tile.Size;
      }
      if (dir === Direction.Right) {
        x += Tile.Size;
      }

      if (dir === Direction.Up) {
        y += Tile.Size;
      }
      if (dir === Direction.Down) {
        y -= Tile.Size;
      }
    }

    return { x, y };
  };

  const addLeap = (dir: Direction) => {
    if (gameState.isEnded || playerState.leapsQueue.length >= MAX_LEAPS_QUEUE) {
      return;
    }

    const { x, y } = getTarget(playerState);
    let [targetX, targetY] = [x, y];

    if (dir === Direction.Left) {
      targetX -= Tile.Size;
    }
    if (dir === Direction.Right) {
      targetX += Tile.Size;
    }

    if (dir === Direction.Up) {
      targetY += Tile.Size;
    }
    if (dir === Direction.Down) {
      targetY -= Tile.Size;
    }

    if (!checkCanLeapTo(targetX, targetY)) {
      return;
    }

    playerState.leapsQueue.push(dir);
  };

  const handleKeyDown = ({ code, repeat }: KeyboardEvent) => {
    if (repeat) {
      return;
    }

    if (['ArrowLeft', 'KeyA'].includes(code)) {
      addLeap(Direction.Left);
    }
    if (['ArrowRight', 'KeyD'].includes(code)) {
      addLeap(Direction.Right);
    }

    if (['ArrowUp', 'KeyW', 'Space'].includes(code)) {
      addLeap(Direction.Up);
    }
    if (['ArrowDown', 'KeyS'].includes(code)) {
      addLeap(Direction.Down);
    }
  };

  useWindowListener({
    listener: handleKeyDown,
    type: 'keydown'
  });

  useSwipe(
    (dir: Direction) => {
      addLeap(dir);
    },
    () => {
      addLeap(Direction.Up);
    }
  );
};
