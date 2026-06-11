/** @type {import('next').NextConfig} */
// Cache buster: cambio de hash de config para forzar a Vercel a NO reusar
// el cache del deploy previo (que estaba corrupto y causaba
// "TypeError: path argument must be of type string" en modifyConfig).
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
