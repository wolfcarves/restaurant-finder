export const baseUrl = 'https://api.foursquare.com';

export const getOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: process.env.FORSQUARE_API_KEY as string,
    },
};
