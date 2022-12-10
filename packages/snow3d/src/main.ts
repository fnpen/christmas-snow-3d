const pointerEventsSupported = (() => {
  const a = document.createElement('x');
  a.style.cssText = 'pointer-events:auto';
  return a.style.pointerEvents === 'auto';
})();

const webGLSupportSupported = (() => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
})();

const log = (message: string) => console.log(`[Show3D] ${message}`);

import { init } from './logic/init';
import { setSettings } from './logic/settings';

const start = () => {
  if (!pointerEventsSupported || !webGLSupportSupported) {
    log(`Silent shutdown: not supported`);
    return;
  }

  init();
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  start();
} else {
  document.addEventListener('DOMContentLoaded', start);
}

window['SNOW3D'] = {
  update: setSettings,
  start: () => setSettings({ paused: false }),
  stop: () => setSettings({ paused: true }),
};
