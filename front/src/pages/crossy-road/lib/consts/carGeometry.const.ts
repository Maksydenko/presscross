import * as THREE from 'three';

import { CarSize } from '../../config';

export const carBodyGeometry = new THREE.BoxGeometry(
  CarSize.X,
  CarSize.Y,
  CarSize.Z
);

export const carGlassGeometry = new THREE.BoxGeometry(
  CarSize.X - 4,
  CarSize.Y / 2,
  CarSize.Z
);
