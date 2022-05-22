const ENVIRONMENTS = require("./app/config/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  reactStrictMode: true,
  env: {
    ...ENVIRONMENTS,
  },
};

module.exports = nextConfig;
