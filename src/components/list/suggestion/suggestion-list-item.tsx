'use client';

import { SearchContext } from '@/context/search-context';
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
    const { keyword, setKeyword, setIsLoading } = searchCtx!;
    const router = useRouter();

    const handleSuggestionClick = async (e: MouseEvent) => {
        e.stopPropagation();
        if (!name) return;

        setIsLoading(true);
        setKeyword(name);

        if (keyword) {
            await queryClient.prefetchQuery({
                queryKey: GET_SEARCH_RESULTS_KEY(name),
                queryFn: async () => await fetchSearchResults(name),
            });
        }

        setIsLoading(false);
        router.push(`/search?keyword=${name}`);
    };

    return (
        <button className="w-full cursor-pointer hover:bg-zinc-50" onMouseDown={handleSuggestionClick}>
            <div className="flex items-center justify-between w-full border-b border-b-zinc-200">
                <p className="text-start text-sm text-zinc-500 truncate py-3">{name}</p>
                <CiSearch size={20} className="text-zinc-500" />
            </div>
        </button>
    );
};

export default SuggestionListItem;
