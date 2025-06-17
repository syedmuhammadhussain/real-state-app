/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost'], // Add your production domain too
        remotePatterns: [
          {

            protocol: 'http',
            hostname: 'localhost', // Replace with your Strapi server domain
            port: '1337', // Replace with your Strapi server port
            pathname: '/uploads/**',
          },
        ],
      },

};

export default nextConfig;
