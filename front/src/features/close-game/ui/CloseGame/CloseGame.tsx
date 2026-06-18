import { FC, ReactNode } from 'react';
import { useSetAtom } from 'jotai';

import {
  gameAtom,
  GamepadButton,
  useGamepad,
  useWindowListener
} from '@/shared/model';

interface CloseGameProps {
  children?: ReactNode;
  className?: string;
  resetGame: () => void;
}

export const CloseGame: FC<CloseGameProps> = ({
  children,
  className,
  resetGame
}) => {
  const setGame = useSetAtom(gameAtom);

  const closeGame = () => {
    resetGame();
    setGame(null);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code !== 'Escape') {
      return;
    }

    closeGame();
  };

  useGamepad({
    onButton: btn => {
      if (btn !== GamepadButton.PS) {
        return;
      }

      closeGame();
    }
  });

  useWindowListener({
    listener: handleKeyDown,
    type: 'keydown'
  });

  if (!children) {
    return null;
  }

  return (
    <button className={className} type="button" onClick={closeGame}>
      {children}
    </button>
  );
};
