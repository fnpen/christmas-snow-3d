export const getWindowDimensions = (): { innerWidth: number; innerHeight: number } => {
  const innerWidth = Number(
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  );

  const innerHeight = Number(
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  );

  return { innerWidth, innerHeight };
};

export const scrollHeight = (): number =>
  Number(document.documentElement.scrollHeight || document.body.scrollHeight);

export const scrollPosition = (): number =>
  Number(document.documentElement.scrollTop || document.body.scrollTop);

export const randomInt = (min: number, max: number): number => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

export const randomIntMax = (max: number): number => {
  return Math.floor(Math.random() * max);
};
