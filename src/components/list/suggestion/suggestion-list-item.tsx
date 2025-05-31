'use client';

import { SuggestionContext } from '@/context/suggestion-context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { CiSearch } from 'react-icons/ci';

interface SuggestionListItemProps {
    name?: string;
}

const SuggestionListItem = ({ name }: SuggestionListItemProps) => {
    const router = useRouter();
    const suggestionCtx = useContext(SuggestionContext);

    const handleSuggestionClick = () => {
        if (!name) return;

        suggestionCtx?.setKeyword(name);
        router.push(`/search?keyword=${name}`);
    };

    return (
        <div className="w-full cursor-pointer hover:bg-zinc-50" onClick={handleSuggestionClick}>
            <div className="flex items-center justify-between w-full border-b border-b-zinc-200">
                <p className="text-sm text-zinc-500 py-3">{name}</p>
                <CiSearch size={20} className="text-zinc-500" />
            </div>
        </div>
    );
};

export default SuggestionListItem;
