import { nanoid } from 'nanoid';
import * as THREE from 'three';

import { Tile, TileType, TreeHeight } from '../../config';

import { IRowData } from '../interfaces';

export const generateForest = (length: number): IRowData => {
  const occupiedTiles = new Set<number>();

  const trees = Array.from(
    {
      length
    },
    () => {
      let tileIndex: number;

      do {
        tileIndex = THREE.MathUtils.randInt(Tile.Min, Tile.Max);
      } while (occupiedTiles.has(tileIndex));

      occupiedTiles.add(tileIndex);

      return {
        height: THREE.MathUtils.randInt(TreeHeight.Min, TreeHeight.Max),
        id: nanoid(),
        tileIndex
      };
    }
  );

  return {
    id: nanoid(),
    treeIndexes: occupiedTiles,
    trees,
    type: TileType.Grass
  };
};
