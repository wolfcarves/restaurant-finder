export interface SearchResultItem {
    fsq_id: string;
    categories: {
        id: number;
        name: string;
        short_name: string;
        plural_name: string;
        icon: {
            prefix: string;
            suffix: string;
        };
    }[];
    chains: [];
    closed_bucket: string;
    distance: number;
    geocodes: {
        main: {
            latitude: number;
            longitude: number;
        };
        roof: {
            latitude: number;
            longitude: number;
        };
    };
    link: string;
    location: {
        address: string;
        address_extended?: string;
        census_block?: string;
        country: string;
        cross_street?: string;
        dma?: string;
        formatted_address: string;
        locality?: string;
        postcode?: string;
        region?: string;
    };
    name: string;
    related_places: Record<string, unknown>;
    timezone: string;
}
