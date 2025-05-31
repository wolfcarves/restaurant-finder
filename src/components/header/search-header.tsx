'use client';

import { useState } from 'react';
import SearchForm from '../forms/search-form/search-form';
import SuggestionList from '../list/suggestion/suggestion-list';
import Logo from '../ui/logo';

const SearchHeader = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            {/* To reserve space */}
            <div className="h-32" aria-label="Reserve position" />

            <div
                className={`${
                    isOpen ? 'h-screen fixed' : 'absolute'
                }  top-0 -start-20 w-full h-32 bg-white border-b border-b-zinc-200/80 px-4 duration-500`}
            >
                <div className="flex flex-row gap-x-10 items-start w-full max-w-7xl mx-auto py-4">
                    <div className="mt-[13px]">
                        <Logo />
                    </div>

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
