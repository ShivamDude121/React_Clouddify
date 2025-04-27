const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // images: { unoptimized: true },
  // // Disable webpack cache to prevent ENOENT errors
  // webpack: (config, { dev, isServer }) => {
  //   if (dev && !isServer) {
  //     config.cache = false;
  //   }
  //   return config;
  // },
};

module.exports = nextConfig;