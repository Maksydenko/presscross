import { FC } from 'react';

import { Game } from '@/shared/model';

export interface IGame {
  component: () => Promise<{ default: FC }>;
  id: Game;
  imageUrl: string;
  title: string;
}
