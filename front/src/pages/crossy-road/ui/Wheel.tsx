import { FC } from 'react';

import { WheelSize } from '../config';

import { wheelGeometry, wheelMaterial } from '../lib';

interface WheelProps {
  position: [number, number];
}

export const Wheel: FC<WheelProps> = ({ position }) => (
  <mesh
    geometry={wheelGeometry}
    material={wheelMaterial}
    position={[...position, WheelSize.Z / 2]}
    castShadow
    receiveShadow
  />
);
