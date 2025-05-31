import forsquare from '@api/fsq-developers';

export const getFourSquareInstance = () => {
    const apiKey = process.env.FORSQUARE_API_KEY ?? '';
    forsquare.auth(apiKey);
    return forsquare;
};
