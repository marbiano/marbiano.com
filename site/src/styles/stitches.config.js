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
      white30: `hsl(${colors.white} / 0.30)`,
      white40: `hsl(${colors.white} / 0.40)`,
      white50: `hsl(${colors.white} / 0.50)`,
      white60: `hsl(${colors.white} / 0.60)`,
      white70: `hsl(${colors.white} / 0.70)`,
      white90: `hsl(${colors.white} / 0.90)`,
      black: `hsl(${colors.black})`,
      black05: `hsl(${colors.black} / 0.05)`,
      black10: `hsl(${colors.black} / 0.1)`,
      black20: `hsl(${colors.black} / 0.2)`,
      black30: `hsl(${colors.black} / 0.3)`,
      black40: `hsl(${colors.black} / 0.4)`,
      black50: `hsl(${colors.black} / 0.5)`,
      black60: `hsl(${colors.black} / 0.6)`,
      black75: `hsl(${colors.black} / 0.75)`,
      black80: `hsl(${colors.black} / 0.80)`,
      black85: `hsl(${colors.black} / 0.85)`,
      black90: `hsl(${colors.black} / 0.90)`,
      orange: `hsl(${colors.orange})`,
      orange05: `hsl(${colors.orange} / 0.05)`,
      orange10: `hsl(${colors.orange} / 0.1)`,
      orange15: `hsl(${colors.orange} / 0.15)`,
      orange50: `hsl(${colors.orange} / 0.50)`,
      orange80: `hsl(${colors.orange} / 0.80)`,
      lightOrange: `hsl(${colors.lightOrange})`,
      blue: `hsl(${colors.blue})`,
      blue05: `hsl(${colors.blue} / 0.05)`,
      blue10: `hsl(${colors.blue} / 0.1)`,
      blue15: `hsl(${colors.blue} / 0.15)`,
      lightBlue: `hsl(${colors.lightBlue})`,
      lightBlue50: `hsl(${colors.lightBlue} / 0.50)`,
      paleBlue: `hsl(${colors.paleBlue})`,
      green: `hsl(${colors.green})`,
      paleGreen: `hsl(${colors.paleGreen})`,
      lightGreen: `hsl(${colors.lightGreen})`,
      lightGreen10: `hsl(${colors.lightGreen} / 0.1)`,
      lightGreen30: `hsl(${colors.lightGreen} / 0.3)`,
      lightGreen80: `hsl(${colors.lightGreen} / 0.8)`,
      lightGreen90: `hsl(${colors.lightGreen} / 0.9)`,
    },
    fonts: fonts.faces,
    space: {
      column: grid.column,
      gutter: grid.gutter,
    },
    shadows: {
      paper: `hsl(${colors.lightBlue} / .75)`,
    },
  },
  utils: {},
  media: breakpoints,
});
