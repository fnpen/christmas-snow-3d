import type { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera.js';
import type { BufferGeometry } from 'three/src/core/BufferGeometry.js';
import type { Points } from 'three/src/objects/Points.js';
import type { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js';
import type { Scene } from 'three/src/scenes/Scene.js';

type Variables = {
  scene?: Scene;
  camera?: PerspectiveCamera;
  renderer?: WebGLRenderer;
  particles?: Points;
  bufferGeometry?: BufferGeometry;
  container?: HTMLElement;
};

export const variables: Variables = {
  scene: undefined,
  camera: undefined,
  renderer: undefined,
  particles: undefined,
  bufferGeometry: undefined,
  container: undefined,
};
