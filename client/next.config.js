/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.picsum.photos']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:4000/uploads/:path*'
      },
    ]
  },
}

module.exports = nextConfig
