import { createRootElement } from './createRootElement';
import { setOpacity } from './opacity';
import { cancelRender, queueRender } from './render';
import { updateScene } from './updateScene';
import { variables } from './variables';

let removeTimer;
let redrawTimer;

let defaultSettings = {
  speed: 50,
  particleLevel: 500,
  paused: false,
};

export type Settings = Partial<typeof defaultSettings>;

let currentSettings = {
  ...defaultSettings,
};

export const setSettings = (settings: Settings) => {
  if (redrawTimer) {
    clearTimeout(redrawTimer);
    redrawTimer = undefined;
  }

  if (variables.container) {
    setOpacity(0);

    if (removeTimer) {
      clearTimeout(removeTimer);
      removeTimer = undefined;
    }

    removeTimer = setTimeout(() => {
      variables.container.remove();
      variables.container = undefined;
      removeTimer = undefined;
    }, 3000);
  }

  currentSettings = {
    ...defaultSettings,
    ...(settings?.speed ? { speed: Number(settings.speed) } : {}),
    ...(settings?.particleLevel ? { particleLevel: Number(settings.particleLevel) } : {}),
    paused: settings?.paused || defaultSettings.paused,
  };

  if (!currentSettings.paused) {
    redrawTimer = setTimeout(() => {
      updateScene({ opacity: 0 });
      setOpacity(1);

      redrawTimer = undefined;
      if (removeTimer) {
        clearTimeout(removeTimer);
        removeTimer = undefined;
      }

      if (!variables.container) {
        variables.container = createRootElement();
        variables.container.appendChild(variables.renderer.domElement);
        document.body.append(variables.container);

        cancelRender();
        queueRender();
      }

    }, 500);
  }
};

export const getSettings = (): typeof defaultSettings => ({ ...currentSettings });
