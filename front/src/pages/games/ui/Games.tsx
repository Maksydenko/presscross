import { FC, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';

import {
  Direction,
  gameAtom,
  getPropertyValue,
  useSwipe,
  useWheel,
  useWindowListener
} from '@/shared/model';

import { gameData, IGame, IService, serviceData } from '../model';

import s from './Games.module.scss';

interface GamesProps {
  className?: string;
}

export const Games: FC<GamesProps> = ({ className }) => {
  const [activeIndex, setActiveIndex] = useState(serviceData.length);
  const containerRef = useRef<HTMLUListElement | null>(null);

  const [game, setGame] = useAtom(gameAtom);

  const cardSize = getPropertyValue('--cardSize');
  const cardGap = getPropertyValue('--cardGap');

  const translateX =
    activeIndex > 1
      ? (cardSize + cardGap) * (activeIndex - 1) - cardSize / 2.6
      : 0;

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    containerElement.style.translate = `-${translateX}px 0`;
  }, [translateX]);

  const nextGame = () => {
    setActiveIndex(prev =>
      Math.min(prev + 1, serviceData.length + gameData.length - 1)
    );
  };
  const prevGame = () => {
    setActiveIndex(prev => Math.max(prev - 1, 0));
  };

  const openGame = () => {
    const allItems = [...serviceData, ...gameData];
    const currentItem = allItems[activeIndex];

    if (serviceData.includes(currentItem as IService)) {
      window.open((currentItem as IService).link, '_blank');
    }

    if (gameData.includes(currentItem as IGame)) {
      setGame((currentItem as IGame).id);
    }
  };

  const handleKeyDown = ({ code }: KeyboardEvent) => {
    if (game) {
      return;
    }

    if (['ArrowLeft', 'KeyA'].includes(code)) {
      prevGame();
    }

    if (['ArrowRight', 'KeyD'].includes(code)) {
      nextGame();
    }

    if (['Enter', 'NumpadEnter'].includes(code)) {
      openGame();
    }
  };

  useWindowListener({
    listener: handleKeyDown,
    type: 'keydown'
  });

  useWheel((deltaY: number) => {
    if (game) {
      return;
    }

    if (deltaY > 0) {
      nextGame();
    }

    if (deltaY < 0) {
      prevGame();
    }
  });

  useSwipe(
    (dir: Direction) => {
      if (game) {
        return;
      }

      if (dir === Direction.Left) {
        prevGame();
      }
      if (dir === Direction.Right) {
        nextGame();
      }
    },
    () => {
      if (game) {
        return;
      }

      openGame();
    }
  );

  return (
    <div className={clsx(s.games, className)}>
      <ul ref={containerRef} className={s.games__list}>
        {serviceData.map((service, index) => (
          <li
            key={service.title}
            className={clsx(
              s.games__item,
              s.games__item_mini,
              index === activeIndex && s.games__item_active
            )}
          >
            <div className={s.games__logo}>
              <img alt={service.title} src={service.logo} />
            </div>
            <h2 className={s.games__title}>{service.title}</h2>
          </li>
        ))}
        {gameData.map((game, index) => (
          <li
            key={game.id}
            className={clsx(
              s.games__item,
              index + serviceData.length === activeIndex && s.games__item_active
            )}
          >
            <div className={s.games__logo}>
              <img alt={game.title} src={game.imageUrl} />
            </div>
            <h2 className={s.games__title}>{game.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};
