/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  
  output: 'standalone',
  i18n: {
    locales: ['en'], // Add the supported languages here
    defaultLocale: 'en', // Set the default language
  },
 
  images: {
    remotePatterns: [
      
  
      {
        protocol: 'https',
        hostname: 'pic.musicpy.com',
        port: '',
        pathname: '/**',
      },  {
        protocol: 'https',
        hostname: 'pic.nopayapp.com',
        port: '',
        pathname: '/**',
      },  {
        protocol: 'https',
        hostname: 'imageupload.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add the ProvidePlugin to make jQuery globally available
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );

    return config;
  },
};

module.exports = nextConfig;
