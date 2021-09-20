import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from '@styles/stitches.config';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/marbiano-regular.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/marbiano-bold.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/marbiano-mono.woff2"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cloud.typography.com/6916494/7728412/css/fonts.css"
          />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
