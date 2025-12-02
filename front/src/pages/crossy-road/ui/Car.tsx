import { FC, useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { Mesh } from 'three';

import { useFrame } from '@react-three/fiber';

import { Direction } from '@/shared/model';

import { CarSize, Tile, WheelSize } from '../config';

import {
  carBodyGeometry,
  carGlassGeometry,
  carGlassMaterial,
  getCarMaterial
} from '../lib';

import { vehiclesAtom } from '../model';

import { Wheel } from './Wheel';

interface CarProps {
  color: number;
  direction: Direction.Left | Direction.Right;
  position: [number, number];
  speed: number;
}

const WHEEL_VISIBLE_PART = 1;

export const Car: FC<CarProps> = ({ color, direction, position, speed }) => {
  const setCars = useSetAtom(vehiclesAtom);

  const ref = useRef<Mesh>(null!);
  const id = useRef(nanoid()).current;

  const positionX = -CarSize.X + WheelSize.X * 2 - WHEEL_VISIBLE_PART;
  const positionReverseX = CarSize.X - WheelSize.X * 2 + WHEEL_VISIBLE_PART;

  useEffect(() => {
    setCars(prev => [
      ...prev,
      {
        id,
        ref: ref.current,
        rowIndex: Math.round(position[1] / Tile.Size)
      }
    ]);

    return () => {
      setCars(prev => prev.filter(car => car.id !== id));
    };
  }, [id, position, setCars]);

  useFrame((_, delta) => {
    const refElement = ref.current;

    if (!refElement) {
      return;
    }

    // Move
    refElement.position.x +=
      (direction === Direction.Right ? 1 : -1) * speed * delta;

    // Reset
    if (
      direction === Direction.Right &&
      refElement.position.x > Tile.Size * (Tile.PerRow + 1)
    ) {
      refElement.position.x = -Tile.Size * (Tile.PerRow + 1);
    }
    if (
      direction === Direction.Left &&
      refElement.position.x < -Tile.Size * (Tile.PerRow + 1)
    ) {
      refElement.position.x = Tile.Size * (Tile.PerRow + 1);
    }
  });

  return (
    <group
      ref={ref}
      position={[...position, 0]}
      rotation={[
        0,
        0,
        (Math.PI / 2) * (direction === Direction.Right ? -1 : 1)
      ]}
    >
      {/* Body */}
      <mesh
        geometry={carBodyGeometry}
        material={getCarMaterial(color)}
        position={[0, 2, CarSize.Z / 2 + WheelSize.Z / 3]}
        castShadow
        receiveShadow
      />
      {/* Glass */}
      <mesh
        position={[0, -4, 4 + CarSize.Z + WheelSize.Z / 3]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[CarSize.X - 4, CarSize.Y / 2, CarSize.Z]} />
        <meshLambertMaterial color={0xf3ffff} />
      </mesh>
      <mesh
        geometry={carGlassGeometry}
        material={carGlassMaterial}
        position={[0, -4, 4 + CarSize.Z + WheelSize.Z / 3]}
        castShadow
        receiveShadow
      />
      {/* Wheels */}
      <Wheel position={[positionX, CarSize.Y / 2.5]} />
      <Wheel position={[positionReverseX, CarSize.Y / 2.5]} />
      <Wheel position={[positionX, -CarSize.Y / 3.5]} />
      <Wheel position={[positionReverseX, -CarSize.Y / 3.5]} />
    </group>
  );
};
