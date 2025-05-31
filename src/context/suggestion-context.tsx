// We can use other global state management like zustand but I used react context instead

import { createContext } from 'react';

export type SuggestionPayload = {
    keyword: string;
    setKeyword: (keyword: string) => void;
};

export const SuggestionContext = createContext<SuggestionPayload | null>(null);
