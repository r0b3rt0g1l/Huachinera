/** @type {import('next').NextConfig} */
// Cache buster (rev huachinera-2026-06-11a): un cambio en este archivo fuerza a
// Vercel a recompilar desde cero. Las NEXT_PUBLIC_* se hornean en build time, así
// que si un deploy reusa cache viejo el slug/API_URL quedan incrustados con el
// valor anterior. Si tras configurar las env vars el sitio sigue mostrando datos
// viejos, sube este rev y haz un build fresco (no un redeploy del build previo).
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
