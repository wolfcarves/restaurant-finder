// We can use other global state management like zustand but I used react context instead

import { createContext } from 'react';

export type SearchContextType = {
    keyword: string;
    setKeyword: (keyword: string) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);
