import { createStitches } from '@stitches/react';

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
      black: '#10100f',
      white: 'white',
    },
    fontSizes: {
      1: '16px',
    },
    fonts: {
      sans: 'Marbiano, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      serif: '"Sentinel A", "Sentinel B", serif',
      mono: '"Marbiano Mono", monospace',
    },
  },
  utils: {
    marginX: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
  media: {
    bp1: '(min-width: 520px)',
    bp2: '(min-width: 900px)',
  },
});
