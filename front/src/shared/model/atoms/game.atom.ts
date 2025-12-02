import { atom } from 'jotai';

import { Game } from '@/shared/config';

export const gameAtom = atom<Game | null>(null);
