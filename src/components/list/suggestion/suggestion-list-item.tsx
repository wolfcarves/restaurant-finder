'use client';

import { SearchContext } from '@/context/search-context';
import { SuggestionContext } from '@/context/suggestion-context';
import { fetchSearchResults, GET_SEARCH_RESULTS_KEY } from '@/hooks/api/useApiGetSearchResults';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useContext } from 'react';
import { CiSearch } from 'react-icons/ci';

interface SuggestionListItemProps {
    name?: string;
}

const SuggestionListItem = ({ name }: SuggestionListItemProps) => {
    const queryClient = useQueryClient();
    const searchCtx = useContext(SearchContext);
    const router = useRouter();
    const suggestionCtx = useContext(SuggestionContext);

    const handleSuggestionClick = async (e: MouseEvent) => {
        e.stopPropagation();
        if (!name) return;

        searchCtx?.setIsLoading(true);

        if (suggestionCtx?.keyword) {
            await queryClient.prefetchQuery({
                queryKey: GET_SEARCH_RESULTS_KEY(name),
                queryFn: async () => await fetchSearchResults(name),
            });
        }

        searchCtx?.setIsLoading(false);

        suggestionCtx?.setKeyword(name);
        router.push(`/search?keyword=${name}`);
    };

    return (
        <button className="w-full cursor-pointer hover:bg-zinc-50" onMouseDown={handleSuggestionClick}>
            <div className="flex items-center justify-between w-full border-b border-b-zinc-200">
                <p className="text-sm text-zinc-500 py-3">{name}</p>
                <CiSearch size={20} className="text-zinc-500" />
            </div>
        </button>
    );
};

export default SuggestionListItem;
