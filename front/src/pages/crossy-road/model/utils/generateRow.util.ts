import * as THREE from 'three';

import { Tile, TileType } from '../../config';

import { generateForest } from './generateForest.util';
import { generateRoad } from './generateRoad.util';
import { chooseRandomElement } from './chooseRandomElement.util';

import { IRowData } from '../interfaces';

export const generateRow = (isEmpty?: boolean): IRowData => {
  if (isEmpty) {
    return generateForest(0);
  }

  const type = chooseRandomElement([TileType.Grass, TileType.Road]);

  if (type === TileType.Road) {
    return generateRoad();
  }

  return generateForest(
    THREE.MathUtils.randInt(
      Math.round(Tile.PerRow / 4),
      Math.round(Tile.PerRow / 3)
    )
  );
};
