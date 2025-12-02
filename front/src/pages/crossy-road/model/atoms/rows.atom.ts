import { atom } from 'jotai';

import { IRowData } from '../interfaces';
import { generateRows } from '../utils';

const INITIAL_EMPTY_ROW_NUMBER = 1;
const INITIAL_ROW_NUMBER = 20;
const INITIAL_FULL_ROW_NUMBER = INITIAL_ROW_NUMBER - INITIAL_EMPTY_ROW_NUMBER;

export const rowsAtom = atom<IRowData[]>([
  ...generateRows(INITIAL_EMPTY_ROW_NUMBER, true),
  ...generateRows(INITIAL_FULL_ROW_NUMBER)
]);

export const addRowsAtom = atom(null, (get, set, newRows: number = 1) => {
  const prev = get(rowsAtom);

  set(rowsAtom, [...prev, ...generateRows(newRows)]);
});

export const resetRowsAtom = atom(null, (_, set) => {
  set(rowsAtom, [
    ...generateRows(INITIAL_EMPTY_ROW_NUMBER, true),
    ...generateRows(INITIAL_FULL_ROW_NUMBER)
  ]);
});
