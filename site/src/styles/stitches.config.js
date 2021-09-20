import { createStitches } from '@stitches/react';

import { colors, fonts, grid, breakpoints, rem } from './tokens';

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      ...Object.keys(colors).reduce((acc, curr) => {
        acc[curr] = `hsl(${colors[curr]})`;
        return acc;
      }, {}),
      white: `hsl(${colors.white})`,
      black: `hsl(${colors.black})`,
      black10: `hsl(${colors.black} / 0.1)`,
      black30: `hsl(${colors.black} / 0.3)`,
      black40: `hsl(${colors.black} / 0.4)`,
      black75: `hsl(${colors.black} / 0.75)`,
      black80: `hsl(${colors.black} / 0.80)`,
      black85: `hsl(${colors.black} / 0.85)`,
      orange: `hsl(${colors.orange})`,
      lightOrange: `hsl(${colors.lightOrange})`,
      blue: `hsl(${colors.blue})`,
      blue05: `hsl(${colors.blue} / 0.05)`,
      blue10: `hsl(${colors.blue} / 0.1)`,
      blue15: `hsl(${colors.blue} / 0.15)`,
      paleBlue: `hsl(${colors.paleBlue})`,
      green: `hsl(${colors.green})`,
      paleGreen: `hsl(${colors.paleGreen})`,
      lightGreen: `hsl(${colors.lightGreen})`,
      lightGreen10: `hsl(${colors.lightGreen} / 0.1)`,
      lightGreen80: `hsl(${colors.lightGreen} / 0.8)`,
    },
    fonts: fonts.faces,
    space: {
      column: grid.column,
      gutter: grid.gutter,
    },
  },
  utils: {},
  media: breakpoints,
});
