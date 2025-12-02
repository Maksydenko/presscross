import { FC } from 'react';

import { Game } from '@/shared/config';

export interface IGame {
  component: () => Promise<{ default: FC }>;
  id: Game;
  imageUrl: string;
  title: string;
}
