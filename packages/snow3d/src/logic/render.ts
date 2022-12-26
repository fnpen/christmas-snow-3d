import { getCameraPoint, getTargets } from './getTargets';
import { variables } from './variables';

const f = (val: number, delta: number): number => {
  if (val > delta) val -= 2 * delta;
  if (val < -1 * delta) val += 2 * delta;
  return val;
};

export const render = () => {
  if (!variables.container || !variables.particles) {
    return;
  }

  const position = variables.particles.geometry.attributes.position;

  if (!position) {
    return;
  }

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

  variables.renderer.render(variables.scene, variables.camera);

  queueRender();
};

let requestID: number;

export const queueRender = () => (requestID = requestAnimationFrame(render));
export const cancelRender = () => {
  if (requestID > 0) {
    cancelAnimationFrame(requestID);
    requestID = 0;
  }
};
