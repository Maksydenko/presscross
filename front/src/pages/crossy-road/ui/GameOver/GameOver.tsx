'use client';

import { FC } from 'react';
import clsx from 'clsx';
import { useAtomValue, useSetAtom } from 'jotai';

import { useWindowListener } from '@/shared/model';
import { Transition } from '@/shared/ui';

import { gameStateAtom, resetGameAtom } from '../../model';

import s from './GameOver.module.scss';

interface GameOverProps {
  className?: string;
}

export const GameOver: FC<GameOverProps> = ({ className }) => {
  const { isEnded } = useAtomValue(gameStateAtom);
  const resetGame = useSetAtom(resetGameAtom);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isEnded || !['Enter', 'NumpadEnter', 'Space'].includes(e.code)) {
      return;
    }

    resetGame();
  };

  useWindowListener({
    listener: handleKeyDown,
    type: 'keydown'
  });

  return (
    <Transition className={clsx(s.gameOver, className)} isShow={isEnded}>
      <div className={s.gameOver__body}>
        <div className={s.gameOver__content}>
          <div className={s.gameOver__box}>
            <p>Game over</p>
          </div>
        </div>
        <button className={s.gameOver__btn} type="button" onClick={resetGame}>
          Play again
        </button>
      </div>
    </Transition>
  );
};
