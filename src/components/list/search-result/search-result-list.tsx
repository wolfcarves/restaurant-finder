'use client';

import SearchResultItem from './search-result-item';
import { useSearchParams } from 'next/navigation';
import { useApiGetSearchResults } from '@/hooks/api/useApiGetSearchResults';
import { useCallback } from 'react';
import SearchResultItemSkeleton from './search-result-item-skeleton';

const SearchResultList = () => {
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword') ?? '';

    const { data: searchResults, isLoading: isSearchResultsLoading } = useApiGetSearchResults({ keyword });

    const results = useCallback(
        () =>
            searchResults?.data?.map(({ ...props }, idx) => {
                return <SearchResultItem {...props} key={idx} />;
            }),
        [searchResults]
    );

    return (
        <>
            {isSearchResultsLoading
                ? Array.from({ length: 10 }).map((_, idx) => <SearchResultItemSkeleton key={idx} />)
                : results()}
        </>
    );
};

export default SearchResultList;
