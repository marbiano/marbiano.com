import styles from '@styles/globals';

export default function MyApp({ Component, pageProps }) {
  styles();
  return <Component {...pageProps} />;
}
