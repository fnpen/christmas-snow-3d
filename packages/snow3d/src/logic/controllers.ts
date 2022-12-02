import { getWindowDimensions, scrollPosition } from './utils';

let mouseX = 0;
let mouseY = 0;
let wheelY = 0;

window.addEventListener('wheel', () => {
  wheelY = scrollPosition();
});

document.addEventListener(
  'mousemove',
  (event) => {
    const { innerWidth, innerHeight } = getWindowDimensions();

    mouseX = event.clientX - innerWidth / 2;
    mouseY = event.clientY - innerHeight / 2;
  },
  false,
);

document.addEventListener(
  'touchstart',
  (event) => {
    if (event.touches.length == 1) {
      event.preventDefault();

      const { innerWidth, innerHeight } = getWindowDimensions();
      mouseX = event.touches[0].pageX - innerWidth / 2;
      mouseY = event.touches[0].pageY - innerHeight / 2;
    }
  },
  false,
);

document.addEventListener(
  'touchmove',
  (event) => {
    if (event.touches.length == 1) {
      event.preventDefault();
      const { innerWidth, innerHeight } = getWindowDimensions();
      mouseX = event.touches[0].pageX - innerWidth / 2;
      mouseY = event.touches[0].pageY - innerHeight / 2;
    }
  },
  false,
);

export const getControllersState = () => ({ mouseX, mouseY, wheelY });
