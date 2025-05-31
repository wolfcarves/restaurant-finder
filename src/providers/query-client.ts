import { isServer, QueryClient } from '@tanstack/react-query';

export const makeQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 1 * 30,
            },
        },
    });

let browserQueryClient: QueryClient | undefined = undefined;

export const getQueryClient = () => {
    if (isServer) {
        return makeQueryClient();
    } else {
        browserQueryClient ??= makeQueryClient();
        return browserQueryClient;
    }
};
