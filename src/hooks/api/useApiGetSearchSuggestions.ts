import { Place } from '@/types/place';
import { useQuery } from '@tanstack/react-query';

type SearchSuggestionsResponse = { data: Place[] };

export function useApiGetSearchSuggestions({ keyword }: { keyword: string }) {
    return useQuery<SearchSuggestionsResponse>({
        queryKey: ['search-suggestions-key', keyword],
        queryFn: async () => {
            if (!keyword) throw new Error('No keyword');

            const response = await fetch(`http://localhost:3000/api/search/suggestions?keyword=${keyword}`);
            if (!response.ok) throw new Error('Failed to fetch');

            const result = await response.json();

            return {
                data: result.data.slice(0, 5),
            } as SearchSuggestionsResponse;
        },
        initialData: { data: [] },
    });
}
