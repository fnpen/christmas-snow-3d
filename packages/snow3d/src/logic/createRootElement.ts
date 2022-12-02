export const createRootElement = (): HTMLElement => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '0px';
  container.style.right = '0px';
  container.style.top = '0px';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999999';

  return container;
};
