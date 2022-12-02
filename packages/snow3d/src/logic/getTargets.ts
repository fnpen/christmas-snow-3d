import { getControllersState } from './controllers';
import { getWindowDimensions, scrollHeight } from './utils';

export const getCameraPoint = (): { x: number; y: number } => {
  const { mouseX, mouseY, wheelY } = getControllersState();
  const { innerWidth, innerHeight } = getWindowDimensions();

  const pY = (innerHeight / 2 - mouseY) / innerHeight;
  const pX = (innerWidth / 2 - mouseX) / innerWidth;

  const sh = scrollHeight();
  const pSH = (sh / 2 - wheelY) / sh;

  const x = (innerWidth * pX) / 4 - innerWidth / 8;
  const y = (-1 * innerHeight * pY) / 4 - (innerHeight * pSH) / 2 + innerHeight / 4;

  return { x, y };
};

let targets = getCameraPoint();

export const getTargets = () => targets;
