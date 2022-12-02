const PI180 = Math.PI / 180;

export const calcVelocity = (
  speed: number,
  angleX: number,
  angleY: number,
): [x: number, y: number, z: number] => {
  const piX = angleX * PI180;
  const piY = angleY * PI180;

  let x = 0;
  let y = (-3 * speed) / 150;
  let z = 0;
  let sin: number;

  sin = Math.sin(piY);
  y = y * Math.cos(piX);

  x = x * Math.cos(piY) - y * sin * Math.sin(piX);
  z = -sin * x;

  return [x, y, z];
};
