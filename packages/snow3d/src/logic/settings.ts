import { createRootElement } from './createRootElement';
import { setOpacity } from './opacity';
import { cancelRender, queueRender } from './render';
import { updateScene } from './updateScene';
import { variables } from './variables';

let removeTimer;

let defaultSettings = {
  speed: 50,
  particleLevel: 500,
  paused: false,
  stoped: false,
};

export type Settings = Partial<typeof defaultSettings>;

let currentSettings = {
  ...defaultSettings,
};

export const setSettings = (settings: Settings) => {
  currentSettings = {
    ...defaultSettings,
    ...(settings?.speed ? { speed: Number(settings.speed) } : {}),
    ...(settings?.particleLevel ? { particleLevel: Number(settings.particleLevel) } : {}),
    paused: settings?.paused || defaultSettings.paused,
  };

  if (!settings?.paused && currentSettings.stoped) {
    currentSettings.stoped = false;
  }

  if (currentSettings.paused && variables.container) {
    setOpacity(0);

    // TODO: remove async without timer.
    removeTimer = setTimeout(() => {
      currentSettings.stoped = true;
      variables.container.remove();
      variables.container = undefined;
    }, 3000);
  }

  updateScene({ opacity: 0 });

  if (!currentSettings.paused && !variables.container) {
    variables.container = createRootElement();
    variables.container.appendChild(variables.renderer.domElement);
    document.body.append(variables.container);

    cancelRender();
    queueRender();
  }

  if (!settings?.paused) {
    if (removeTimer) {
      clearTimeout(removeTimer);
    }

    setOpacity(1);
  }
};

export const getSettings = (): typeof defaultSettings => ({ ...currentSettings });
