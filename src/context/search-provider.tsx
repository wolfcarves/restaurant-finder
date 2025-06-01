'use client';

import { ReactNode, useState } from 'react';
import { SearchContext } from './search-context';
import { useSearchParams } from 'next/navigation';

const SearchProvider = ({ children }: { children: ReactNode }) => {
    const searchParams = useSearchParams();
    const keywordFromParams = searchParams.get('keyword');

    const [keyword, setKeyword] = useState<string>(keywordFromParams ?? '');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <SearchContext.Provider value={{ keyword, setKeyword, isLoading, setIsLoading }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
