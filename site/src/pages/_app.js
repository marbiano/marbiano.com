import globalStyles from '@styles/globals';

export default function MyApp({ Component, pageProps }) {
  globalStyles();
  return <Component {...pageProps} />;
}
