import * as THREE from 'three';

import { TreeSize } from '../../config';

export const treeTrunkGeometry = new THREE.BoxGeometry(
  TreeSize.X,
  TreeSize.Y,
  TreeSize.Z
);

export const treeLeavesGeometry = new THREE.BoxGeometry(24, 24, 1);
