import { atom } from 'jotai';
import { Object3D } from 'three';

export interface IVehicleState {
  id: string;
  ref: null | Object3D;
  rowIndex: number;
}

export const vehiclesAtom = atom<IVehicleState[]>([]);
