import { useAtomValue } from 'jotai';
import * as THREE from 'three';

import { useFrame } from '@react-three/fiber';

import { CameraPosition, LightPosition, Tile } from '../../config';

import { cameraAtom, lightAtom } from '../atoms';

export const useTrackPlayer = (
  playerElement: null | THREE.Group<THREE.Object3DEventMap>
) => {
  const light = useAtomValue(lightAtom);
  const camera = useAtomValue(cameraAtom);

  useFrame(() => {
    if (!playerElement) {
      return;
    }

    const {
      position: { x, y }
    } = playerElement;

    if (camera) {
      camera.position.set(
        x + CameraPosition.X,
        y + CameraPosition.Y,
        CameraPosition.Z
      );
      camera.lookAt(x + Tile.Size / 3, y, 40);
      camera.updateProjectionMatrix();
    }

    if (light) {
      light.position.set(
        x + LightPosition.X,
        y + LightPosition.Y,
        LightPosition.Z
      );
      light.target.position.set(x, y, 0);
      light.target.updateMatrixWorld();
    }
  });
};
