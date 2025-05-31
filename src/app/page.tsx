import { RxSketchLogo } from 'react-icons/rx';
import SearchForm from '@/components/forms/search-form/search-form';
import SuggestionList from '@/components/list/suggestion/suggestion-list';

export default async function HomePage() {
    return (
        <div className="relative w-full max-w-[40rem] mx-auto h-screen px-4">
            <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                <div className="mx-auto w-max">
                    <RxSketchLogo size={30} className="text-zinc-800" />
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                <SearchForm withDescription />
            </div>

            <div className="absolute top-[calc(50%+6rem)] left-1/2 transform -translate-x-1/2 w-full px-4">
                <SuggestionList />
            </div>
        </div>
    );
}
