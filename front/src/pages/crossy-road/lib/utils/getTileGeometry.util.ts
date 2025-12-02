import * as THREE from 'three';

import { Tile } from '../../config';

const boxGeometry = new THREE.BoxGeometry(Tile.Size, Tile.Size, Tile.GrassSize);
const planeGeometry = new THREE.PlaneGeometry(Tile.Size, Tile.Size);

export const getTileGeometry = (isGrass: boolean) =>
  isGrass ? boxGeometry : planeGeometry;
