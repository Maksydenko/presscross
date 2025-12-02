import gsap from 'gsap';
import { useAtom, useAtomValue } from 'jotai';
import * as THREE from 'three';

import { useFrame } from '@react-three/fiber';

import { Tile } from '../../config';

import { gameStateAtom, vehiclesAtom } from '../atoms';

const SCALE = 0.1;
const SCALE_TIME = 0.2;

export const useHitDetection = (
  playerElement: null | THREE.Group<THREE.Object3DEventMap>
) => {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const vehicles = useAtomValue(vehiclesAtom);

  useFrame(() => {
    if (gameState.isEnded || gameState.isLoading || !playerElement) {
      return;
    }

    const playerBox = new THREE.Box3().setFromObject(playerElement);

    for (const vehicle of vehicles) {
      const vehicleRef = vehicle.ref;

      if (!vehicleRef) {
        continue;
      }

      const carBox = new THREE.Box3().setFromObject(vehicleRef);

      if (!playerBox.intersectsBox(carBox)) {
        continue;
      }

      gsap.to(playerElement.scale, {
        duration: SCALE_TIME,
        z: SCALE
      });

      gsap.to(playerElement.position, {
        duration: SCALE_TIME,
        z: Tile.GrassSize / 2 - 1
      });

      setGameState(prev => ({
        ...prev,
        isEnded: true
      }));
    }
  });
};
