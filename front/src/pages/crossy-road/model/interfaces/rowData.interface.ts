import { Direction } from '@/shared/model';

import { TileType } from '../../config';

import { ITree } from './tree.interface';
import { IVehicle } from './vehicle.interface';

export interface IRowData {
  direction?: Direction.Left | Direction.Right;
  id: string;
  speed?: number;
  treeIndexes?: Set<number>;
  trees?: ITree[];
  type: TileType;
  vehicles?: IVehicle[];
}
