const ENVIRONMENTS = require("./app/config/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  reactStrictMode: true,
  env: {
    ...ENVIRONMENTS,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
