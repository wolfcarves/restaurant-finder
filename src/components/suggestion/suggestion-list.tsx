'use client';

import React, { useContext, useEffect } from 'react';
import { SuggestionContext } from '@/context/suggestion-context';
import { useApiGetSearchSuggestions } from '@/hooks/api/useApiGetSearchSuggestions';
import { CiSearch } from 'react-icons/ci';

const SuggestionList = () => {
    const suggestions = useContext(SuggestionContext);

    const { data: suggestionData, refetch: refetchSuggestion } = useApiGetSearchSuggestions({
        keyword: suggestions?.keyword ?? '',
    });

    useEffect(() => {
        const keyword = suggestions?.keyword;
        if (keyword) refetchSuggestion();
    }, [refetchSuggestion, suggestions?.keyword]);

    useEffect(() => {
        console.log('suggestionData', suggestionData);
    }, [suggestionData]);

    const _suggestionData = suggestionData?.data.filter((res) => res.place && res.place.name);

    return (
        <div className="flex flex-col justify-center w-full">
            {_suggestionData?.map(({ place }) => {
                return (
                    <div
                        key={place?.fsq_id}
                        className="flex items-center justify-between w-full border-b border-b-zinc-200"
                    >
                        <p className="text-sm text-zinc-500 py-3">{place?.name}</p>
                        <CiSearch size={20} className="text-zinc-500" />
                    </div>
                );
            })}
        </div>
    );
};

export default SuggestionList;
