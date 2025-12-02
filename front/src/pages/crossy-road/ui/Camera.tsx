import { FC, useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import * as THREE from 'three';

import { OrthographicCamera } from '@react-three/drei';

import { Breakpoint } from '@/shared/config';

import { CameraPosition } from '../config';

import { cameraAtom } from '../model';

export const Camera: FC = () => {
  const cameraRef = useRef<THREE.OrthographicCamera>(null);
  const setCamera = useSetAtom(cameraAtom);

  useEffect(() => {
    const cameraElement = cameraRef.current;
    setCamera(cameraElement);

    if (!cameraElement) {
      return;
    }

    const updateZoom = () => {
      const width = window.innerWidth;

      if (width < Breakpoint.Mobile) {
        cameraElement.zoom = 2.0;
      } else if (width < Breakpoint.Tablet) {
        cameraElement.zoom = 3.2;
      } else {
        cameraElement.zoom = 4;
      }

      cameraElement.updateProjectionMatrix();
    };

    updateZoom();
    window.addEventListener('resize', updateZoom);

    return () => {
      setCamera(null);
      window.removeEventListener('resize', updateZoom);
    };
  }, [setCamera]);

  return (
    <OrthographicCamera
      ref={cameraRef}
      far={1000}
      near={0.1}
      position={[CameraPosition.X, CameraPosition.Y, CameraPosition.Z]}
      up={[0, 0, 1]}
      zoom={4}
      makeDefault
    />
  );
};
