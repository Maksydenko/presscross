import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';
import { useAtomValue } from 'jotai';

import { Game as GameEnum } from '@/shared/config';
import { gameAtom, IOption } from '@/shared/model';
import { Transition } from '@/shared/ui';

import s from './Game.module.scss';

interface GameProps {
  className?: string;
  games: IOption<ReactNode, GameEnum>[];
}

export const Game: FC<GameProps> = ({ className, games }) => {
  const game = useAtomValue(gameAtom);

  return (
    <div className={clsx(s.game, className)}>
      {games.map(({ id, label, value }) => (
        <Transition key={id} isShow={game === label}>
          {value}
        </Transition>
      ))}
    </div>
  );
};
