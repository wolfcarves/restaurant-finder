export const getBaseUrl = () => {
    return process.env.NODE_ENV === 'development' ? 'localhost:3000' : process.env.NEXT_API_BASE_URL;
};
