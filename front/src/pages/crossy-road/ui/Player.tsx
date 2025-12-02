import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';

import { useGLTF } from '@react-three/drei';

import { Model } from '../config';

import {
  useAddLeap,
  useHitDetection,
  useLeap,
  useResetPlayer,
  useTrackPlayer
} from '../model';

export const Player: FC = () => {
  const { scene } = useGLTF(Model.Chicken);
  const playerRef = useRef<THREE.Group>(null);

  const playerState = useRef({
    leapsQueue: [],
    position: {
      x: 0,
      y: 0
    },
    rotation: {
      z: 0
    }
  }).current;

  useTrackPlayer(playerRef.current);
  useHitDetection(playerRef.current);

  useAddLeap(playerState);
  useLeap(playerRef.current, playerState);

  useResetPlayer(playerRef.current, playerState);

  useEffect(() => {
    scene.traverse((obj: THREE.Object3D) => {
      obj.castShadow = true;
      obj.receiveShadow = true;
    });
  }, [scene]);

  return (
    <group ref={playerRef}>
      <primitive
        object={scene}
        position={[0, 0, 17]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={[2, 2, 2]}
      />
    </group>
  );
};
