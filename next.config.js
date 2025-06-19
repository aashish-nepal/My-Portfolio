/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect /info to homepage
      {
        source: '/info',
        destination: '/',
        permanent: true,  // 301 redirect
      },

      // Your existing redirect for non-www to www (if needed)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'aashish-nepal.com.np',
          },
        ],
        destination: 'https://www.aashish-nepal.com.np/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
