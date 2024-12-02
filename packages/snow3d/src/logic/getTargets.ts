import { getWindowDimensions, scrollHeight } from './utils';

export const getCameraPoint = (): { x: number; y: number } => {
  const { innerWidth, innerHeight } = getWindowDimensions();

  const pY = (innerHeight / 2) / innerHeight;
  const pX = (innerWidth / 2) / innerWidth;

  const sh = scrollHeight();
  const pSH = (sh / 2) / sh;

  const x = (innerWidth * pX) / 4 - innerWidth / 8;
  const y = (-1 * innerHeight * pY) / 4 - (innerHeight * pSH) / 2 + innerHeight / 4;

  return { x, y };
};

let targets = getCameraPoint();

export const getTargets = () => targets;
