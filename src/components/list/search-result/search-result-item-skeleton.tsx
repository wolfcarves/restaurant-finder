const SearchResultItemSkeleton = () => {
    return (
        <div className="py-2 animate-pulse">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 py-2">
                <div className="rounded-full bg-zinc-200 h-5 w-24" />
                <div className="bg-zinc-200 h-4 w-20 rounded" />
            </div>

            <div className="h-5 bg-zinc-200 rounded w-3/4 mb-2" />

            <div className="h-4 bg-zinc-200 rounded w-full" />
        </div>
    );
};

export default SearchResultItemSkeleton;
