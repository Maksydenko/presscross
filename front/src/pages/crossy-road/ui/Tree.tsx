import { FC } from 'react';

import { Tile, TreeSize } from '../config';

import {
  getTreeLeavesGeometry,
  treeLeavesMaterial,
  treeTrunkGeometry,
  treeTrunkMaterial
} from '../lib';

interface ThreeProps {
  height: number;
  position: [number, number];
}

export const Tree: FC<ThreeProps> = ({ height, position }) => (
  <group position={[...position, 0]}>
    {/* Thunk */}
    <mesh
      geometry={treeTrunkGeometry}
      material={treeTrunkMaterial}
      position={[0, 0, TreeSize.Z / 2 + Tile.GrassSize / 2]}
      castShadow
      receiveShadow
    />
    {/* Leaves */}
    <mesh
      geometry={getTreeLeavesGeometry(height)}
      material={treeLeavesMaterial}
      position={[0, 0, height / 2 + TreeSize.Z + Tile.GrassSize / 2]}
      castShadow
      receiveShadow
    />
  </group>
);
