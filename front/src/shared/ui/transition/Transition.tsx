import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';

import { Transition as RootTransition } from '@headlessui/react';

import s from './Transition.module.scss';

interface TransitionProps {
  children: ReactNode;
  className?: string;
  isShow: boolean;
}

export const Transition: FC<TransitionProps> = ({
  children,
  className,
  isShow
}) => (
  <RootTransition show={isShow} transition>
    <div className={clsx(s.transition, className)}>{children}</div>
  </RootTransition>
);
