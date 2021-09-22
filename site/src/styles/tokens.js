export const colors = {
  white: '120 0% 100%',
  black: '120 11% 8%',
  orange: '19 95% 47%',
  lightOrange: '27 99% 44%',
  blue: '208 85% 47%',
  lightBlue: '208 32% 85%',
  paleBlue: '208 37% 62%',
  green: '122 33% 58%',
  paleGreen: '120 22% 67%',
  lightGreen: '120 4% 77%',
};

export const fonts = {
  faces: {
    sans: 'Marbiano, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    serif: '"Sentinel A", "Sentinel B", serif',
    mono: '"Marbiano Mono", monospace',
  },
  sizes: {
    base: 16,
    leading: 1.5,
  },
};

export const grid = {
  column: 150,
  gutter: 30,
};

export const breakpoints = {
  bp1: '(min-width: 520px)',
  bp2: '(min-width: 900px)',
};

export const rem = (px) => `${px / fonts.sizes.base}rem`;
export const gridUnit = (cols) => grid.column * cols + grid.gutter * (cols - 1);
