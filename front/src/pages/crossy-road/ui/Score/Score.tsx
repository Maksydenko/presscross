import { FC } from 'react';
import { clsx } from 'clsx';
import { useAtomValue } from 'jotai';

import { positionXAtom } from '../../model';

import s from './Score.module.scss';

interface ScoreProps {
  className?: string;
}

export const Score: FC<ScoreProps> = ({ className }) => {
  const score = useAtomValue(positionXAtom);

  return <div className={clsx(s.score, className)}>{score.maxX}</div>;
};
