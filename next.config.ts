// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep transpilePackages for browserslist, as it often helps with its dynamic resolution
  transpilePackages: ['browserslist'],
};

module.exports = nextConfig;