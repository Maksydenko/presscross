import { generateRow } from './generateRow.util';

import { IRowData } from '../interfaces';

export const generateRows = (length: number, isEmpty?: boolean): IRowData[] =>
  Array.from(
    {
      length
    },
    () => generateRow(isEmpty)
  );
