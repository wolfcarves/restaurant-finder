'use client';

import Input from '../ui/input';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { SuggestionContext } from '@/context/suggestion-context';

const SearchForm = () => {
    const autoComplete = useContext(SuggestionContext);
    const [searchValue, setSearchValue] = useState<string>('');
    const debounceSearchValue = useDebounce(searchValue, 500);
    const router = useRouter();

    useEffect(() => {
        if (!debounceSearchValue) autoComplete?.setKeyword('');
        autoComplete?.setKeyword(debounceSearchValue);
    }, [autoComplete, debounceSearchValue]);

    const handleSubmitForm = () => {
        if (!searchValue) return;
        router.push(`/search?keyword=${searchValue}`);
    };

    return (
        <Input
            placeholder="Search"
            onChange={(e) => {
                const value = e.target.value;
                setSearchValue(value);
            }}
            onSubmit={handleSubmitForm}
        />
    );
};

export default SearchForm;
