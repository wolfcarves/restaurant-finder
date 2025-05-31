export type SuggestionPlace = {
    type: 'place';
    text: {
        primary: string;
        secondary: string;
        highlight: {
            start: number;
            length: number;
        }[];
    };
    link: string;
    place: {
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
        distance: number;
        geocodes: {
            main: {
                latitude: number;
                longitude: number;
            };
        };
        location: {
            address: string;
            country: string;
            cross_street: string;
            formatted_address: string;
            locality: string;
            region: string;
        };
        name: string;
    };
};
