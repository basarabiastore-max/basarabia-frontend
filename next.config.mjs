/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/terms-and-conditions', destination: '/termeni-si-conditii', permanent: true },
      { source: '/privacy-policy',       destination: '/confidentialitate',   permanent: true },
      { source: '/delivery',             destination: '/livrare',             permanent: true },
      { source: '/cookies',              destination: '/cookie-uri',          permanent: true },
    ]
  },
};

export default nextConfig;
