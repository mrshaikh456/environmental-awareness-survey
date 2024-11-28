/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@vercel/postgres'],
}

module.exports = nextConfig
