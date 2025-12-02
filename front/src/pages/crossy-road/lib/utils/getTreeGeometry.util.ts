import * as THREE from 'three';

const geometryCache = new Map<number, THREE.BoxGeometry>();

export const getTreeLeavesGeometry = (height: number) => {
  if (!geometryCache.has(height)) {
    geometryCache.set(height, new THREE.BoxGeometry(24, 24, height));
  }

  return geometryCache.get(height)!;
};
