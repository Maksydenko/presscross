import { memo } from 'react';

import { Direction } from '@/shared/model';

import { Tile, TileType, VehicleSpeed } from '../config';

import { IRowData } from '../model';

import { Car } from './Car';
import { Tiles } from './Tiles';
import { Tree } from './Tree';

interface RowProps extends Partial<IRowData> {
  rowIndex: number;
}

export const Row = memo<RowProps>(function Row({
  direction = Direction.Left,
  rowIndex,
  speed,
  trees,
  type = TileType.Grass,
  vehicles
}) {
  return (
    <group position={[0, rowIndex * Tile.Size, 0]}>
      <Tiles isGrass={type === TileType.Grass} />

      {trees?.map(tree => (
        <Tree
          key={tree.id}
          height={tree.height}
          position={[tree.tileIndex * Tile.Size, 0]}
        />
      ))}

      {vehicles?.map(vehicle => (
        <Car
          key={vehicle.id}
          color={vehicle.color}
          direction={direction}
          position={[vehicle.initialTileIndex * Tile.Size, 0]}
          speed={speed || VehicleSpeed.Min}
        />
      ))}
    </group>
  );
});
