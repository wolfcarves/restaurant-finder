'use client';

import React, { useContext, useEffect } from 'react';
import { SuggestionContext } from '@/context/suggestion-context';
import { useApiGetSearchSuggestions } from '@/hooks/api/useApiGetSearchSuggestions';
import SuggestionListItem from './suggestion-list-item';

const SuggestionList = () => {
    const suggestions = useContext(SuggestionContext);

    const { data: suggestionData, refetch: refetchSuggestion } = useApiGetSearchSuggestions({
        keyword: suggestions?.keyword ?? '',
    });

    useEffect(() => {
        const keyword = suggestions?.keyword;
        if (keyword) refetchSuggestion();
    }, [refetchSuggestion, suggestions?.keyword]);

    const _suggestionData = suggestionData?.data.filter((res) => res.place && res.place.name);

    return (
        <div className="flex flex-col justify-center w-full">
            {_suggestionData?.map(({ place }) => {
                return <SuggestionListItem key={place?.fsq_id} name={place?.name} />;
            })}
        </div>
    );
};

export default SuggestionList;
