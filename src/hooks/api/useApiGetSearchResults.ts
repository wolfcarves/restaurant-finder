import { SearchResultItem } from '@/types/search-result-item';
import { useQuery } from '@tanstack/react-query';

type SearchResultsResponse = { data: SearchResultItem[] };

export const fetchSearchResults = async (keyword: string) => {
    const response = await fetch(`http://localhost:3000/api/search?keyword=${keyword}`);
    if (!response.ok) throw new Error('Failed to fetch');

    const result = await response.json();

    return {
        data: result.data,
    } as SearchResultsResponse;
};

export const GET_SEARCH_RESULTS_KEY = (keyword: string) => ['search-results-key', keyword];

export function useApiGetSearchResults({ keyword }: { keyword: string }) {
    return useQuery<SearchResultsResponse>({
        queryKey: GET_SEARCH_RESULTS_KEY(keyword),
        queryFn: async () => await fetchSearchResults(keyword),
        enabled: !!keyword,
    });
}
