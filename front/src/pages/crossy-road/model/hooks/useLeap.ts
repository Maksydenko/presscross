import { useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import * as THREE from 'three';

import { useFrame } from '@react-three/fiber';

import { Direction, Percent } from '@/shared/model';

import { Tile } from '../../config';

import {
  addRowsAtom,
  gameStateAtom,
  rowsAtom,
  updatePositionXAtom
} from '../atoms';
import { IPlayerState } from '../interfaces';

const STEP_TIME = 0.2;
const LEAP_HEIGHT = 12;
const COMPRESSION = 0.2;
const NEW_ROW_THRESHOLD = 20;

export const useLeap = (
  playerElement: null | THREE.Group<THREE.Object3DEventMap>,
  playerState: IPlayerState
) => {
  const leapTimer = useRef(new THREE.Clock(false)).current;

  const rows = useAtomValue(rowsAtom);
  const addRows = useSetAtom(addRowsAtom);

  const gameState = useAtomValue(gameStateAtom);
  const updatePositionX = useSetAtom(updatePositionXAtom);

  useFrame(() => {
    if (
      gameState.isEnded ||
      gameState.isLoading ||
      !playerElement ||
      !playerState.leapsQueue.length
    ) {
      leapTimer.stop();
      playerState.leapsQueue = [];

      return;
    }

    if (!leapTimer.running) {
      leapTimer.start();
    }

    const leapProgress = Math.min(
      Percent.Hundredth,
      leapTimer.getElapsedTime() / STEP_TIME
    );

    const [dir] = playerState.leapsQueue;
    let {
      position: { x: targetX, y: targetY },
      rotation: { z: targetRotation }
    } = playerState;

    if (dir === Direction.Left) {
      targetX -= Tile.Size;
      targetRotation = Math.PI / 2;
    }
    if (dir === Direction.Right) {
      targetX += Tile.Size;
      targetRotation = -Math.PI / 2;
    }

    if (dir === Direction.Up) {
      targetY += Tile.Size;
      targetRotation = 0;
    }
    if (dir === Direction.Down) {
      targetY -= Tile.Size;
      targetRotation = Math.PI;
    }

    if (
      targetX >= (Tile.Max + 1) * Tile.Size ||
      targetX <= (Tile.Min - 1) * Tile.Size ||
      targetY <= -1 * Tile.Size
    ) {
      playerState.leapsQueue.shift();
      leapTimer.stop();

      return;
    }

    playerElement.position.x = THREE.MathUtils.lerp(
      playerState.position.x,
      targetX,
      leapProgress
    );
    playerElement.position.y = THREE.MathUtils.lerp(
      playerState.position.y,
      targetY,
      leapProgress
    );
    playerElement.position.z = Math.sin(leapProgress * Math.PI) * LEAP_HEIGHT;

    playerElement.scale.z = 1 - COMPRESSION * Math.sin(leapProgress * Math.PI);

    const playerRotation = playerElement.rotation.z;
    const delta =
      ((targetRotation - playerRotation + Math.PI) % (2 * Math.PI)) - Math.PI;
    playerElement.rotation.z = playerRotation + delta * leapProgress;

    const positionIndex = targetY / Tile.Size;
    updatePositionX(positionIndex);

    if (leapProgress >= Percent.Hundredth) {
      playerState.leapsQueue.shift();
      playerState.rotation.z = targetRotation;
      playerState.position.x = targetX;
      playerState.position.y = targetY;

      leapTimer.stop();

      if (positionIndex < rows.length - NEW_ROW_THRESHOLD) {
        return;
      }

      addRows();
    }
  });
};
