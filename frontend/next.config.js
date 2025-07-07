/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'localhost'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:5000/api',
  },
  // rewrites không hỗ trợ với output: 'export', hãy proxy qua nginx
  output: 'export',
};

module.exports = nextConfig;