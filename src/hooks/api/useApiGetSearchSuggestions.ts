import { SuggestionPlace } from '@/types/sugestions';
import { getBaseUrl } from '@/utils/getBaseUrl';
import { useQuery } from '@tanstack/react-query';

type SearchSuggestionsResponse = { data: SuggestionPlace[] };

export function useApiGetSearchSuggestions({ keyword }: { keyword: string }) {
    return useQuery<SearchSuggestionsResponse>({
        queryKey: ['search-suggestions-key', keyword],
        queryFn: async () => {
            const response = await fetch(getBaseUrl() + `/api/search/suggestions?keyword=${keyword}`);
            if (!response.ok) throw new Error('Failed to fetch');

            const result = await response.json();

            return {
                data: result.data.slice(0, 5),
            } as SearchSuggestionsResponse;
        },
        initialData: { data: [] },
        enabled: true,
    });
}
