import { FC } from 'react';
import { clsx } from 'clsx';
import { useSetAtom } from 'jotai';

import { CloseGame } from '@/features/close-game';

import { resetGameAtom } from '../../model';

import s from './Close.module.scss';

interface CloseProps {
  className?: string;
}

export const Close: FC<CloseProps> = ({ className }) => {
  const resetGame = useSetAtom(resetGameAtom);

  return (
    <CloseGame className={clsx(s.close, className)} resetGame={resetGame}>
      x
    </CloseGame>
  );
};
