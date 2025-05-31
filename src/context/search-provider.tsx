'use client';

import { ReactNode, useState } from 'react';
import { SearchContext } from './search-context';

const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return <SearchContext.Provider value={{ isLoading, setIsLoading }}>{children}</SearchContext.Provider>;
};

export default SearchProvider;
