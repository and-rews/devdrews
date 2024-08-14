/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  images: {
    domains: [
      "static.vecteezy.com",
      "media.licdn.com",
      "raw.githubusercontent.com",
      "github.com",
      "drive.google.com",
      "images.prymetourism.com",
      "prymetourism.com",
      "utfs.io",
    ],
  },
};

export default nextConfig;
