'use client';

import Input, { InputProps } from '../../ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { SuggestionContext } from '@/context/suggestion-context';
import { useQueryClient } from '@tanstack/react-query';
import { fetchSearchResults, GET_SEARCH_RESULTS_KEY } from '@/hooks/api/useApiGetSearchResults';
import { SearchContext } from '@/context/search-context';

interface SearchFormProps extends InputProps {
    withDescription?: boolean;
    onSubmitForm?: () => void; // This is just a callback to inform parent components
}

const SearchForm = ({ withDescription = false, onSubmitForm, ...props }: SearchFormProps) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionCtx = useContext(SuggestionContext);
    const searchCtx = useContext(SearchContext);
    const [keyword, setKeyword] = useState<string>('');
    const debounceKeyword = useDebounce(keyword, 500);

    const searchParams = useSearchParams();
    const prevKeyword = searchParams.get('keyword');

    useEffect(() => {
        if (!debounceKeyword) suggestionCtx?.setKeyword('');
        suggestionCtx?.setKeyword(debounceKeyword);
    }, [suggestionCtx, debounceKeyword]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setKeyword(value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSubmitForm();
    };

    const handleSubmitForm = async () => {
        if (!keyword) return;
        onSubmitForm?.();

        searchCtx?.setIsLoading(true);

        await queryClient.prefetchQuery({
            queryKey: GET_SEARCH_RESULTS_KEY(keyword),
            queryFn: async () => await fetchSearchResults(keyword),
        });

        searchCtx?.setIsLoading(false);

        router.push(`/search?keyword=${keyword}`);
    };

    // Set default value every mount
    useEffect(() => {
        if (inputRef.current && prevKeyword) {
            inputRef.current.value = prevKeyword;
        }
    }, [prevKeyword]);

    useEffect(() => {}, [suggestionCtx]);

    return (
        <>
            <Input
                ref={inputRef}
                placeholder="Search"
                onChange={handleOnChange}
                isLoading={searchCtx?.isLoading}
                onKeyDown={handleKeyDown}
                onSearchBtnClick={handleSubmitForm}
                {...props}
            />

            {withDescription && (
                <div className="relative mt-4 h-6 overflow-hidden">
                    <p
                        className={`${
                            searchCtx?.isLoading && '-translate-y-full'
                        } absolute start-0 end-0 mx-auto text-sm text-center text-zinc-500 duration-500`}
                    >
                        Just describe it — we’ll help you find the perfect place.
                    </p>

                    <p
                        className={`
                    ${searchCtx?.isLoading && '-translate-y-full'}
                    absolute top-full start-0 end-0 mx-auto text-sm text-center text-zinc-500 duration-500`}
                    >
                        Finding the perfect place for you...
                    </p>
                </div>
            )}
        </>
    );
};

export default SearchForm;
