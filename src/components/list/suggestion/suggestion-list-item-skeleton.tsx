'use client';

import React from 'react';

const SuggestionListItemSkeleton = () => {
    return (
        <div className="w-full animate-pulse">
            <div className="flex items-center justify-between w-full border-b border-b-zinc-200 px-2 py-3">
                <div className="h-4 bg-zinc-200 rounded w-3/4" />
            </div>
        </div>
    );
};

export default SuggestionListItemSkeleton;
