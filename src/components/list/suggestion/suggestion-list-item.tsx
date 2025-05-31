'use client';

import { SuggestionContext } from '@/context/suggestion-context';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useContext } from 'react';
import { CiSearch } from 'react-icons/ci';

interface SuggestionListItemProps {
    name?: string;
}

const SuggestionListItem = ({ name }: SuggestionListItemProps) => {
    const router = useRouter();
    const suggestionCtx = useContext(SuggestionContext);

    const handleSuggestionClick = (e: MouseEvent) => {
        e.stopPropagation();
        if (!name) return;

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
