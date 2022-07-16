/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'page.ts', 'style.ts'],
  images: {
    domains: ['lorempixel.com', 'os.alipayobjects.com'],
  },
};

module.exports = nextConfig;
