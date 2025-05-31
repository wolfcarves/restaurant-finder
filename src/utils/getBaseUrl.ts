export const getBaseUrl = () => {
    return process.env.NODE_ENV !== 'production' ? 'localhost:3000' : process.env.API_BASE_URL;
};
