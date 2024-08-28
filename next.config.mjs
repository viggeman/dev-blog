/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
        // Add your Storyblok domain here
        port: '', // Usually empty unless your Storyblok uses a specific port
        pathname: '/f/**', // Adjust if your Storyblok image URLs have a different structure
      },
    ],
  },
};

export default nextConfig;
