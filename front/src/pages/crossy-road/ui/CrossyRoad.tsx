import { FC } from 'react';

import { useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Model } from '../config';

import { Camera } from './Camera';
import { Close } from './Close/Close';
import { GameOver } from './GameOver/GameOver';
import { Light } from './Light';
import { Loading } from './Loading/Loading';
import { Map } from './Map';
import { Player } from './Player';
import { Score } from './Score/Score';

import s from './CrossyRoad.module.scss';

export const CrossyRoad: FC = () => {
  useGLTF.preload(Model.Chicken);

  return (
    <div className={s.crossyRoad}>
      <Loading />
      <Score />
      <Close />
      <GameOver />
      <Canvas shadows>
        <ambientLight />
        <Light />
        <Camera />
        <Player />
        <Map />
      </Canvas>
    </div>
  );
};
