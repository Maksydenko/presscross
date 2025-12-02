import * as THREE from 'three';

const materialCache = new Map<number, THREE.MeshLambertMaterial>();

export const getTileMaterial = (color: number) => {
  if (!materialCache.has(color)) {
    materialCache.set(
      color,
      new THREE.MeshLambertMaterial({
        color
      })
    );
  }

  return materialCache.get(color)!;
};
