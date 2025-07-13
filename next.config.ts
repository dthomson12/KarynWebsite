/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  images: {
    unoptimized: true, // Disable next/image optimization for static build
  },
};

export default nextConfig;
