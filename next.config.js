/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com', 'cloudflare-ipfs.com', 'lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
