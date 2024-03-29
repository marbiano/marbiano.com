// @ts-check
import { globalCss } from './stitches.config';

export default globalCss({
  '@font-face': [
    {
      fontFamily: 'Marbiano',
      fontWeight: '400',
      fontDisplay: 'swap',
      src: 'url(/fonts/marbiano-regular.woff2) format("woff2")',
    },
    {
      fontFamily: 'Marbiano',
      fontWeight: '700',
      fontDisplay: 'swap',
      src: 'url(/fonts/marbiano-bold.woff2) format("woff2")',
    },
    {
      fontFamily: 'Marbiano Mono',
      fontWeight: '400',
      fontDisplay: 'swap',
      src: 'url(/fonts/marbiano-mono.woff2) format("woff2")',
    },
  ],
  html: {
    boxSizing: 'border-box',
  },
  '*,*:before,*:after': {
    boxSizing: 'inherit',
  },
  body: {
    background: `linear-gradient(-160deg, $lightGreen05, $lightGreen60)`,
    backgroundAttachment: 'fixed',
    color: 'hsl($black)',
    margin: 0,
    padding: 0,
    fontFamily: '$sans',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
});
