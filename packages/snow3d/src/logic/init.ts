import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera.js';
import { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import { RawShaderMaterial } from 'three/src/materials/RawShaderMaterial.js';
import { Points } from 'three/src/objects/Points.js';
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js';
import { Scene } from 'three/src/scenes/Scene.js';

import { getWindowDimensions } from './utils';

import { getTexture } from './getTexture';
import { queueRender } from './render';
import type { Settings } from './settings';
import { setSettings } from './settings';
import { updateScene } from './updateScene';
import { variables } from './variables';

/// <reference path="glsl.d.ts" />
// @ts-ignore
import fragmentShader from './shaders/fragment.glsl';
// @ts-ignore
import vertexShader from './shaders/vertex.glsl';

export const init = async (settings: Settings = {}): Promise<void> => {
  const { innerWidth, innerHeight } = getWindowDimensions();

  variables.camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 10000);
  variables.scene = new Scene();
  variables.renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  variables.bufferGeometry = new BufferGeometry();

  variables.renderer.setClearAlpha(0);

  setSettings(settings);

  variables.camera.lookAt(variables.scene.position);

  const texture = await getTexture();
  const shaderMaterial = new RawShaderMaterial({
    uniforms: {
      size: {
        value: 32.0,
      },
      texture: {
        value: texture,
      },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  });

  variables.particles = new Points(variables.bufferGeometry, shaderMaterial);
  variables.scene.add(variables.particles);

  queueRender();

  window.addEventListener('resize', () => updateScene({ opacity: 1 }));
};
