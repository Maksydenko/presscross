import { Key } from 'react';

export interface IOption<T = string, K = string> {
  id: Key;
  label: K;
  value: T;
}
