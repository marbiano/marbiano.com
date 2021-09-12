import { globalCss } from './stitches.config';

export default globalCss({
  '@font-face': [
    {
      fontFamily: 'Marbiano',
      fontWeight: '400',
      fontDisplay: 'swap',
      src: 'url(/fonts/marbiano-regular.woff2) format("woff2"), url(/fonts/marbiano-regular.woff) format("woff")',
    },
    {
      fontFamily: 'Marbiano',
      fontWeight: '700',
      fontDisplay: 'swap',
      src: 'url(/fonts/marbiano-bold.woff2) format("woff2"), url(/fonts/marbiano-bold.woff) format("woff")',
    },
  ],
  html: {
    boxSizing: 'border-box',
  },
  '*,*:before,*:after': {
    boxSizing: 'inherit',
  },
  body: {
    background: '$black',
    color: '$white',
    margin: 0,
    padding: 0,
    fontFamily: '$sans',
    fontSize: '$1',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
});
