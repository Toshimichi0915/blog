/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ["blog.toshimichi.net", "blog-dev.toshimichi.net"],
  },
}

module.exports = nextConfig
