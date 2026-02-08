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

    const targets = {
      [Direction.Down]: () => {
        y -= Tile.Size;
      },
      [Direction.Left]: () => {
        x -= Tile.Size;
      },
      [Direction.Right]: () => {
        x += Tile.Size;
      },
      [Direction.Up]: () => {
        y += Tile.Size;
      }
    };

    for (const dir of state.leapsQueue) {
      targets[dir]?.();
    }

    return {
      x,
      y
    };
  };

  const addLeap = (dir: Direction) => {
    if (gameState.isEnded || playerState.leapsQueue.length >= MAX_LEAPS_QUEUE) {
      return;
    }

    const { x, y } = getTarget(playerState);
    let [targetX, targetY] = [x, y];

    const targets = {
      [Direction.Down]: () => {
        targetY -= Tile.Size;
      },
      [Direction.Left]: () => {
        targetX -= Tile.Size;
      },
      [Direction.Right]: () => {
        targetX += Tile.Size;
      },
      [Direction.Up]: () => {
        targetY += Tile.Size;
      }
    };

    targets[dir]?.();

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
