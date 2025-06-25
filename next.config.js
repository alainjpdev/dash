/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true, // Solo deja esto si estás usando Server Actions
  },
  images: {
    domains: ['awgdyinecxbnloehjgxu.supabase.co'],
  },
};

module.exports = nextConfig;