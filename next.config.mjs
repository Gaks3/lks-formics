/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'api.site-shot.com',
      },
    ],
  },
}

export default nextConfig
