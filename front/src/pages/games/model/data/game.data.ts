import { Game } from '@/shared/config';

import { IGame } from '../interfaces';

export const gameData: IGame[] = [
  {
    component: () =>
      import('@/pages/crossy-road/ui/CrossyRoad').then(m => ({
        default: m.CrossyRoad
      })),
    id: Game.CrossyRoad,
    imageUrl: '/imgs/logos/games/crossy-road.png',
    title: 'Crossy Road'
  }
];
