import { FC, useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { DirectionalLight } from 'three';

import { LightPosition } from '../config';

import { lightAtom } from '../model';

export const Light: FC = () => {
  const lightRef = useRef<DirectionalLight>(null!);
  const setLight = useSetAtom(lightAtom);

  useEffect(() => {
    setLight(lightRef.current);

    return () => {
      setLight(null);
    };
  }, [setLight]);

  return (
    <directionalLight
      ref={lightRef}
      intensity={1}
      position={[LightPosition.X, LightPosition.Y, LightPosition.Z]}
      shadow-camera-bottom={-400}
      shadow-camera-far={1000}
      shadow-camera-left={-400}
      shadow-camera-right={400}
      shadow-camera-top={400}
      shadow-mapSize-height={2048}
      shadow-mapSize-width={2048}
      castShadow
    />
  );
};
