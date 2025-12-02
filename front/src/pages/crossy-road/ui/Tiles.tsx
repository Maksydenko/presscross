import { memo, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

import { Tile } from '../config';

import { getTileGeometry, getTileMaterial } from '../lib';

interface RowTilesProps {
  isGrass: boolean;
}

export const Tiles = memo(function Tiles({ isGrass }: RowTilesProps) {
  const centerRef = useRef<THREE.InstancedMesh>(null);
  const leftRef = useRef<THREE.InstancedMesh>(null);
  const rightRef = useRef<THREE.InstancedMesh>(null);

  const mainColor = isGrass ? 0xa6d85e : 0x484e5d;
  const sideColor = isGrass ? 0x9cd056 : 0x404552;

  const offset = Math.floor(Tile.PerRow / 2);

  useLayoutEffect(() => {
    const centerElement = centerRef.current;
    const leftElement = leftRef.current;
    const rightElement = rightRef.current;

    if (!centerElement || !leftElement || !rightElement) {
      return;
    }

    const centerDummy = new THREE.Object3D();
    const leftDummy = new THREE.Object3D();
    const rightDummy = new THREE.Object3D();

    for (let i = 0; i < Tile.PerRow; i++) {
      const startXRightDummy = (offset + 1 + i) * Tile.Size;

      centerDummy.position.set((i - offset) * Tile.Size, 0, 0);
      leftDummy.position.set(-startXRightDummy, 0, 0);
      rightDummy.position.set(startXRightDummy, 0, 0);

      centerDummy.updateMatrix();
      leftDummy.updateMatrix();
      rightDummy.updateMatrix();

      centerElement.setMatrixAt(i, centerDummy.matrix);
      leftElement.setMatrixAt(i, leftDummy.matrix);
      rightElement.setMatrixAt(i, rightDummy.matrix);
    }
  }, [isGrass, offset]);

  return (
    <>
      <instancedMesh
        ref={centerRef}
        args={[
          getTileGeometry(isGrass),
          getTileMaterial(mainColor),
          Tile.PerRow
        ]}
        receiveShadow
      />

      <instancedMesh
        ref={leftRef}
        args={[
          getTileGeometry(isGrass),
          getTileMaterial(sideColor),
          Tile.PerRow
        ]}
        receiveShadow
      />

      <instancedMesh
        ref={rightRef}
        args={[
          getTileGeometry(isGrass),
          getTileMaterial(sideColor),
          Tile.PerRow
        ]}
        receiveShadow
      />
    </>
  );
});
