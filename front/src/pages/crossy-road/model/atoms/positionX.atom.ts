import { atom } from 'jotai';

const INITIAL_POSITION_X = 0;

const INITIAL_STATE = {
  currentX: INITIAL_POSITION_X,
  maxX: INITIAL_POSITION_X
};

export const positionXAtom = atom(INITIAL_STATE);

export const updatePositionXAtom = atom(null, (_, set, currentX: number) => {
  set(positionXAtom, prev => ({
    currentX,
    maxX: currentX > prev.maxX ? currentX : prev.maxX
  }));
});

export const resetPositionXAtom = atom(null, (_, set) => {
  set(positionXAtom, INITIAL_STATE);
});
