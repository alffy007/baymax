/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      domains: ['img.icons8.com','images.pexels.com'],
    },
    node: {
      console: false,
      global: true,
      process: true,
      __filename: 'mock',
      __dirname: 'mock',
      Buffer: true,
      setImmediate: true
  
      // See "Other node core libraries" for additional options.
    }
  };