'use client';

import { useState } from 'react';
import SearchForm from '../forms/search-form/search-form';
import SuggestionList from '../list/suggestion/suggestion-list';

const SearchHeader = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            {/* To reserve space */}
            <div className="h-32" aria-label="Reserve position" />

            <div
                className={`${
                    isOpen ? 'h-screen fixed' : 'absolute h-32'
                }  top-0 start-0 w-full bg-white border-b border-b-zinc-200/80 px-4 duration-500`}
            >
                <div className="w-full max-w-7xl mx-auto py-4">
                    <div className="w-full max-w-[40rem]">
                        <SearchForm
                            onFocus={() => setIsOpen(true)}
                            onBlur={() => setIsOpen(false)}
                            onSubmitForm={() => setIsOpen(false)}
                        />

                        {isOpen && (
                            <div className="mt-5">
                                <SuggestionList />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchHeader;
