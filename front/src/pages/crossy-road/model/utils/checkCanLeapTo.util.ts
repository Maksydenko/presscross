import { getDefaultStore } from 'jotai';

import { Tile, TileType } from '../../config';

import { rowsAtom } from '../atoms';

const store = getDefaultStore();

export const checkCanLeapTo = (x: number, y: number): boolean => {
  const rows = store.get(rowsAtom);

  const tileIndex = Math.round(x / Tile.Size);
  const rowIndex = Math.round(y / Tile.Size);

  const row = rows[rowIndex];

  if (!row || row.type === TileType.Road) {
    return true;
  }

  if (row.type === TileType.Grass && row.treeIndexes?.has(tileIndex)) {
    return false;
  }

  return true;
};
