import { atom } from 'jotai';

const INITIAL_STATE = {
  isEnded: false,
  isLoading: true,
  resetCount: 0
};

export const gameStateAtom = atom(INITIAL_STATE);
