/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.ibb.co', 'givenshare.s3.us-east-1.amazonaws.com']
  },
  output: 'standalone'
}

module.exports = nextConfig
