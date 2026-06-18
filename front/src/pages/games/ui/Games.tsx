import { FC, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useAtom } from 'jotai';

import {
  Direction,
  gameAtom,
  GamepadButton,
  getPropertyValue,
  useGamepad,
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

  const [gameId, setGameId] = useAtom(gameAtom);

  const cardSize = getPropertyValue('--cardSize');
  const cardGap = getPropertyValue('--cardGap');

  const translateX =
    activeIndex > 1
      ? (cardSize + cardGap) * (activeIndex - 1) - cardSize / 2.6
      : 0;

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
      setGameId((currentItem as IGame).id);
    }
  };

  const switchers: Partial<Record<Direction, () => void>> = {
    [Direction.Left]: () => {
      prevGame();
    },
    [Direction.Right]: () => {
      nextGame();
    }
  };

  const handlers: Partial<Record<GamepadButton, () => void>> = {
    [GamepadButton.Cross]: () => {
      openGame();
    },
    [GamepadButton.Left]: () => {
      prevGame();
    },
    [GamepadButton.Right]: () => {
      nextGame();
    }
  };

  const handleKeyDown = ({ code }: KeyboardEvent) => {
    if (gameId) {
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
    if (gameId) {
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
      if (gameId) {
        return;
      }

      switchers[dir]?.();
    },
    () => {
      if (gameId) {
        return;
      }

      openGame();
    }
  );

  useGamepad({
    onButton: btn => {
      if (gameId) {
        return;
      }

      handlers[btn as GamepadButton]?.();
    },
    onStick: dir => {
      if (gameId) {
        return;
      }

      switchers[dir]?.();
    }
  });

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return;
    }

    containerElement.style.translate = `-${translateX}px 0`;
  }, [translateX]);

  return (
    <div className={clsx(s.games, className)}>
      <ul ref={containerRef} className={s.games__list}>
        {serviceData.map((service, i) => (
          <li
            key={service.title}
            className={clsx(
              s.games__item,
              s.games__item_mini,
              i === activeIndex && s.games__item_active
            )}
          >
            <div className={s.games__logo}>
              <img alt={service.title} src={service.logo} />
            </div>
            <h2 className={s.games__title}>{service.title}</h2>
          </li>
        ))}
        {gameData.map((game, i) => (
          <li
            key={game.id}
            className={clsx(
              s.games__item,
              i + serviceData.length === activeIndex && s.games__item_active
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
