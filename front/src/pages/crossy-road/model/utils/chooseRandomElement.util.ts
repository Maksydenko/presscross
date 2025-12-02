export const chooseRandomElement = <T>(arr: T[]) =>
  arr[(Math.random() * arr.length) | 0];
