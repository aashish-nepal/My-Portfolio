/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/(.*)',
          has: [
            {
              type: 'host',
              value: 'aashish-nepal.com.np',
            },
          ],
          destination: 'https://www.aashish-nepal.com.np/:1',
          permanent: true,
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  