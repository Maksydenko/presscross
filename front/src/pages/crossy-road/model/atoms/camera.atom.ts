import { atom } from 'jotai';
import { OrthographicCamera } from 'three';

export const cameraAtom = atom<null | OrthographicCamera>(null);
