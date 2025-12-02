import { Direction } from '@/shared/model';

export interface IPlayerState {
  leapsQueue: Direction[];
  position: {
    x: number;
    y: number;
  };
  rotation: {
    z: number;
  };
}
