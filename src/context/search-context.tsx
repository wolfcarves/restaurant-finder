// We can use other global state management like zustand but I used react context instead

import { createContext } from 'react';

export type SearchPayload = {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
};

export const SearchContext = createContext<SearchPayload | null>(null);
