import * as THREE from 'three';

import { WheelSize } from '../../config';

export const wheelGeometry = new THREE.BoxGeometry(
  WheelSize.X,
  WheelSize.Y,
  WheelSize.Z
);
