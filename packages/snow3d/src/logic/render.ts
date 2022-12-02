import anime from 'animejs/lib/anime.es.js';
import { getControllersState } from './controllers';
import { getCameraPoint, getTargets } from './getTargets';
import { getSettings } from './settings';
import { variables } from './variables';

const f = (val: number, delta: number): number => {
  if (val > delta) val -= 2 * delta;
  if (val < -1 * delta) val += 2 * delta;
  return val;
};

let mouseXLast: number;
let mouseYLast: number;
let wheelYLast: number;
let animation: anime.AnimeInstance;

export const render = () => {
  const { stoped } = getSettings();

  if (stoped || !variables.particles) {
    return;
  }

  const position = variables.particles.geometry.attributes.position;
  const posArr = variables.particles.geometry.attributes.position.array;
  const velArr = variables.particles.geometry.attributes.velocity.array;
  const delta = variables.camera.position.z;

  const particleNum = posArr.length / 3;
  for (let i = 0; i < particleNum; i++) {
    let s = i * 3;

    position.setXYZ(
      i,
      f(posArr[s] + velArr[s], delta),
      f(posArr[s + 1] + velArr[s + 1], delta),
      f(posArr[s + 2] + velArr[s + 2], delta),
    );
  }

  variables.particles.geometry.attributes.position.needsUpdate = true;

  const { mouseX, mouseY, wheelY } = getControllersState();

  if (mouseXLast !== mouseX || mouseYLast !== mouseY || wheelYLast !== wheelY) {
    const { x, y } = getCameraPoint();

    animation = anime({
      targets: getTargets(),
      x,
      y,
      duration: 700,
      easing: 'easeOutQuint',
      update: () => {
        const targets = getTargets();

        variables.camera.position.x = targets.x;
        variables.camera.position.y = targets.y;

        variables.camera.lookAt(variables.scene.position);
      },
    });

    mouseXLast = mouseX;
    mouseYLast = mouseY;
    wheelYLast = wheelY;
  }

  variables.renderer.render(variables.scene, variables.camera);

  queueRender();
};

let requestID: number;

export const queueRender = () => (requestID = requestAnimationFrame(render));
export const cancelRender = () => requestID > 0 && cancelAnimationFrame(requestID);
