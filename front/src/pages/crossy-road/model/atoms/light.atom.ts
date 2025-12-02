import { atom } from 'jotai';
import { DirectionalLight } from 'three';

export const lightAtom = atom<DirectionalLight | null>(null);
