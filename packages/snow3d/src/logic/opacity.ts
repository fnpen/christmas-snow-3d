import anime from 'animejs/lib/anime.es.js';
import { variables } from './variables';

const opacityTarget = {
  opacity: 0,
};

export const setOpacity = (opacity: number): void => {
  anime({
    targets: opacityTarget,
    opacity: Number(opacity),
    duration: 2700,
    easing: 'easeOutQuint',

    update: () => {
      const opacity = variables.particles.geometry.attributes.opacity;

      const particleNum = opacity.count / 2;
      for (let i = 0; i < particleNum; i++) {
        opacity.setX(i, opacityTarget.opacity);
      }

      variables.particles.geometry.attributes.opacity.needsUpdate = true;
    },
  });
};
