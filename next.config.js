/** @type {import('next').NextConfig} */


const nextConfig = {
  transpilePackages: ['three'],
  images: {
    domains: ['storage.ko-fi.com', 'storage.googleapis.com'],
  },
}


// const rewrites = async () => {
//   return [
//     {
//       source: '/',
//       destination: '/en'
//     },
//   ]
// }

module.exports = {
  output: 'standalone',
  reactStrictMode: true,
  ...nextConfig,
  // rewrites
}
