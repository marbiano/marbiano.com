module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            dimensions: false,
            svgoConfig: { plugins: [{ removeViewBox: false }] },
            titleProp: true,
            replaceAttrValues: { '#000': 'currentColor' },
          },
        },
      ],
    });
    return config;
  },
};
