import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: {
        OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
        FORSQUARE_API_KEY: process.env.FORSQUARE_API_KEY,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ss3.4sqi.net',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
