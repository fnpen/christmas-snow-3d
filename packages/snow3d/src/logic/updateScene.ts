import { Float32BufferAttribute } from 'three/src/core/BufferAttribute.js';
import { calcVelocity } from './calcVelocity';
import { getTargets } from './getTargets';
import { getSettings } from './settings';
import { getWindowDimensions, randomInt, randomIntMax } from './utils';
import { variables } from './variables';

export const updateScene = async ({ opacity }) => {
  const { particleLevel, speed, paused, stoped } = getSettings();

  if (paused) {
    return;
  }

  const { innerWidth, innerHeight } = getWindowDimensions();

  const perspertiveLevel = Math.max(innerHeight, innerWidth) / 1.8;

  variables.renderer.setPixelRatio(window.devicePixelRatio);
  variables.renderer.setSize(innerWidth, innerHeight);
  variables.camera.aspect = innerWidth / innerHeight;

  if (true) {
    const particleNum = ((innerWidth * innerHeight) / 100000) * particleLevel;

    const vertices = [];
    const velocities = [];
    const colors = [];
    for (let i = 0; i < particleNum; i++) {
      const x = randomIntMax(2 * innerWidth) - innerWidth;
      const y = randomIntMax(2 * innerHeight) - innerHeight;
      const z = randomIntMax(perspertiveLevel);
      vertices.push(x, y, z);

      velocities.push(...calcVelocity(speed, randomInt(-65, 65), randomIntMax(270)));

      colors.push(opacity, 0);
    }

    const colorAttribute = new Float32BufferAttribute(colors, 2);
    colorAttribute.normalized = true;

    variables.bufferGeometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    variables.bufferGeometry.setAttribute('velocity', new Float32BufferAttribute(velocities, 3));
    variables.bufferGeometry.setAttribute('opacity', colorAttribute);
  }

  const targets = getTargets();

  variables.camera.position.set(targets.x, targets.y, perspertiveLevel);

  variables.camera.updateProjectionMatrix();
};
