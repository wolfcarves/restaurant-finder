'use client';

import { ReactNode, useState } from 'react';
import { SuggestionContext } from './suggestion-context';

const SuggestionProvider = ({ children }: { children: ReactNode }) => {
    const [keyword, setKeyword] = useState<string>('');

    return <SuggestionContext.Provider value={{ keyword, setKeyword }}>{children}</SuggestionContext.Provider>;
};

export default SuggestionProvider;
