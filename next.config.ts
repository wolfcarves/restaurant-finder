import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    env: {
        OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
        FORSQUARE_API_KEY: process.env.FORSQUARE_API_KEY,
    },
};

export default nextConfig;
