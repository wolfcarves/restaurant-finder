export const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
        return '';
    }

    const vercelUrl = process.env.NEXT_API_BASE_URL;

    if (vercelUrl) {
        return `https://${vercelUrl}`;
    }

    return 'http://localhost:3000';
};
