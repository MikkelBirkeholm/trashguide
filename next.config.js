/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    prependData: `@import "src/styles/variables.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/400x600/000/*',
      },
    ],
  },
}

module.exports = nextConfig
