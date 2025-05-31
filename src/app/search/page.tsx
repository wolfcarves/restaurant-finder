import SearchHeader from '@/components/header/search-header';
import SearchResultList from '@/components/list/search-result/search-result-list';

export default function SearchPage() {
    return (
        <div className="px-4 md:px-6">
            <SearchHeader />
            <div className="w-full max-w-7xl mx-auto py-4">
                <div className="w-full max-w-[40rem]">
                    <SearchResultList />
                </div>
            </div>
        </div>
    );
}
