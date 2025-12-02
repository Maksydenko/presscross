import { FC } from 'react';
import { useAtomValue } from 'jotai';

import { positionXAtom, rowsAtom } from '../model';

import { Row } from './Row';

const VISIBLE_BACK = 10;
const VISIBLE_FRONT = 30;

export const Map: FC = () => {
  const rows = useAtomValue(rowsAtom);
  const { currentX } = useAtomValue(positionXAtom);

  const start = Math.max(0, currentX - VISIBLE_BACK);
  const end = currentX + VISIBLE_FRONT;

  return (
    <>
      {Array.from({
        length: VISIBLE_BACK
      })
        .slice(0, Math.max(0, VISIBLE_BACK - currentX))
        .map((_, i) => (
          <Row key={i} rowIndex={0 - ++i} />
        ))}

      {rows.slice(start, end).map((row, i) => (
        <Row key={row.id} rowIndex={start + i} {...row} />
      ))}
    </>
  );
};
