import { nanoid } from 'nanoid';
import * as THREE from 'three';

import { Direction } from '@/shared/model';

import { Tile, TileType, VehicleSpeed } from '../../config';

import { chooseRandomElement } from './chooseRandomElement.util';

import { IRowData } from '../interfaces';

export const generateRoad = (): IRowData => {
  const direction: Direction.Left | Direction.Right = chooseRandomElement([
    Direction.Left,
    Direction.Right
  ]);
  const speed = THREE.MathUtils.randInt(VehicleSpeed.Min, VehicleSpeed.Max);
  const vehicles = [];

  let pos = Tile.Min + THREE.MathUtils.randInt(0, 3);

  while (pos < Tile.PerRow) {
    vehicles.push({
      color: chooseRandomElement([
        0x0288d1, 0x7cb342, 0xab47bc, 0xef5350, 0xffb300
      ]),
      id: nanoid(),
      initialTileIndex: pos
    });

    const gap = THREE.MathUtils.randInt(3, 6);
    pos += gap;
  }

  return {
    direction,
    id: nanoid(),
    speed,
    type: TileType.Road,
    vehicles
  };
};
