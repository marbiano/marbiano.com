import Head from 'next/head';

interface SiteHeadProps {
  title: string;
}

const SiteHead: React.FC<SiteHeadProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="https://marbiano.com" />
      <meta property="og:image" content="https://marbiano.com/icon.png" />
      <meta
        property="og:description"
        content="The digital home of Martin Bavio, a senior web developer with a passion for purpose."
      />
      <meta property="og:site_name" content="Marbiano" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content="The digital home of Martin Bavio, a senior web developer with a passion for purpose."
      />
      <meta name="twitter:creator" content="@marbianome" />
      <meta name="twitter:image" content="https://marbiano.com/icon.png" />
    </Head>
  );
};

export default SiteHead;
