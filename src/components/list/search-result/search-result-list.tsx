'use client';

import SearchResultItem from './search-result-item';
import { useSearchParams } from 'next/navigation';
import { useApiGetSearchResults } from '@/hooks/api/useApiGetSearchResults';
import { useCallback } from 'react';

const SearchResultList = () => {
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword') ?? '';

    const { data: searchResults, isPending: isSearchResultsPending } = useApiGetSearchResults({ keyword });

    const results = useCallback(
        () =>
            searchResults?.data?.map(({ ...props }, idx) => {
                return <SearchResultItem {...props} key={idx} />;
            }),
        [searchResults]
    );

    return (
        <>
            {!isSearchResultsPending && searchResults?.data?.length === 0 && (
                <p className="text-sm">No results for {"'" + keyword + "'"}</p>
            )}
            {results()}

            {/* I used to implement this by fallback but prefetch works best I guess */}
            {/* {isSearchResultsPending
                ? Array.from({ length: 10 }).map((_, idx) => <SearchResultItemSkeleton key={idx} />)
                : results()} */}
        </>
    );
};

export default SearchResultList;
