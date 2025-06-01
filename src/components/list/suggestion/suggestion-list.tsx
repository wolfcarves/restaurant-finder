'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useApiGetSearchSuggestions } from '@/hooks/api/useApiGetSearchSuggestions';
import SuggestionListItem from './suggestion-list-item';
import SuggestionListItemSkeleton from './suggestion-list-item-skeleton';
import { SearchContext } from '@/context/search-context';
import { useDebounce } from '@/hooks/useDebounce';

const SuggestionList = () => {
    const searchCtx = useContext(SearchContext);

    const [hasSearched, setHasSearched] = useState<boolean>(false);
    // Has own state for debouncing
    const [keyword, setKeyword] = useState<string>('');
    const debounceKeyword = useDebounce(keyword, 300);

    const {
        data: suggestionData,
        refetch: refetchSuggestion,
        isRefetching,
        isFetched,
    } = useApiGetSearchSuggestions({
        keyword: debounceKeyword,
    });

    useEffect(() => {
        if (debounceKeyword) refetchSuggestion();
    }, [debounceKeyword, refetchSuggestion]);

    useEffect(() => {
        const keyword = searchCtx?.keyword;
        setKeyword(keyword ?? '');
    }, [searchCtx?.keyword]);

    useEffect(() => {
        if (searchCtx?.isLoading) setHasSearched(true);
    }, [searchCtx?.isLoading]);

    const _suggestionData = suggestionData?.data.filter((res) => res.place && res.place.name);

    return (
        <div className="flex flex-col justify-center w-full">
            {isRefetching && !isFetched && !searchCtx?.isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => {
                    return <SuggestionListItemSkeleton key={idx} />;
                })
            ) : !hasSearched ? (
                <div>
                    {_suggestionData?.map(({ place }) => {
                        return <SuggestionListItem key={place?.fsq_id} name={place?.name} />;
                    })}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default SuggestionList;
