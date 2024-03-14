/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    // productionBrowserSourceMaps: false, // Disable source maps in development
    // optimizeFonts: false, // Disable font optimization
    // minify: false, // Disable minification
    fastRefresh: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
            },
            {
                protocol: 'https',
                hostname: 'media.discordapp.net',
            },
            {
                protocol: 'http',
                hostname: '34.87.80.40',
            },
        ],
    },
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
    },
}

module.exports = nextConfig
