import { FC } from 'react';

import CrossyRoad from '@/pages/crossy-road';
import Games from '@/pages/games';

import { Game as GameEnum } from '@/shared/config';

import { Game } from './Game/Game';

import s from './Home.module.scss';

export const Home: FC = () => (
  <div className={s.home}>
    <div className={s.home__body}>
      <Games className={s.home__games} />
      <Game
        className={s.home__game}
        games={[
          {
            id: GameEnum.CrossyRoad,
            label: GameEnum.CrossyRoad,
            value: <CrossyRoad />
          }
        ]}
      />
    </div>
  </div>
);
