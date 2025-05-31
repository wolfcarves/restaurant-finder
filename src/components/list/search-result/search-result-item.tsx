import Image from 'next/image';
import React from 'react';

interface SearchResultItemProps {
    name: string;
    location: {
        formatted_address: string;
        address?: string;
        cross_street?: string;
    };
    categories: {
        name: string;
        icon?: {
            prefix: string;
            suffix: string;
        };
    }[];
    distance: number;
}

const SearchResultItem = ({ name, categories, location, distance }: SearchResultItemProps) => {
    const category = categories?.[0]?.name || 'Unknown Category';
    const distanceKm = distance > 1000 ? `${(distance / 1000).toFixed(1)} km away` : `${distance} m away`;

    return (
        <div className="py-2">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 py-2">
                <div className="flex items-center gap-x-2 rounded-full bg-zinc-100 text-xs w-max py-1 px-1.5">
                    {categories?.[0]?.icon && (
                        <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-400">
                            <Image
                                alt="place-icon"
                                src={`${categories?.[0].icon?.prefix}64${categories?.[0].icon?.suffix}`}
                                width={0}
                                height={0}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {category}
                </div>
                <div className="text-zinc-500 text-xs">{distanceKm}</div>
            </div>

            <h4 className="font-medium">{name}</h4>

            <p className="text-sm text-zinc-500 py-2">{location.formatted_address || 'Address not provided'}</p>
        </div>
    );
};

export default SearchResultItem;
