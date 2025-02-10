/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/redirect-me', // The route to match
        destination: 'https://www.example.com', // The external webpage
        permanent: false, // Use 'true' for a 308 Permanent Redirect, 'false' for a 307 Temporary Redirect
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/external',
        destination: 'https://dummyjson.com',
      },
    ]
  },
}

export default nextConfig
