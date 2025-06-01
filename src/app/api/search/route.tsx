import { baseUrl, getOptions } from '@/lib/forsquareapi';
import { openai } from '@/lib/openapi';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get('keyword');

        const headers = new Headers(request.headers);

        const country = headers.get('x-vercel-ip-country');
        const city = headers.get('x-vercel-ip-city');

        console.log('process.env.NODE_ENV', process.env.NODE_ENV);

        // The user location changes on production, The server of forsquare understand the IP address of cloud platform (Vercel) instead the user/client who request it.
        const userLocationPrompt =
            process.env.NODE_ENV !== 'production'
                ? ''
                : `If the query does not include a specific location. Use this instead ${city} ${country}`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini:free',
            messages: [
                {
                    role: 'system',
                    content: `
                        You are an assistant that:

                        Converts a place or restaurant search query into a structured raw JSON object. Return only the JSON — no code blocks, no explanation, and no comments.

                        If the query includes a specific location (e.g., "in New York", "near Tokyo", "around Paris", "in the United States"): Extract that location. Use it to determine the ll (latitude and longitude).

                        ${userLocationPrompt}

                        If the location is large or general (e.g., a country like “United States” or “Japan”), use the latitude and longitude of its capital city or a major/popular city (e.g., Washington, D.C. for the U.S., Tokyo for Japan).

                        If the query does not mention a location, leave the ll value as an empty string ("").

                        Do not include the location in the query field. Only include the main search keyword like "museum", "ramen", or "coffee shop".

                        Set bias to the most suitable of: "place", "address", "search", or "geo".

                        If there are any spelling errors or typos in the location or keyword, correct them before generating the JSON.

                        Always return a complete JSON object with the following keys: query, ll, radius, types, bias, and limit.

                        {
                            "query": "",
                            "ll": "",
                            "radius": 5000,
                            "types": "place",
                            "bias": "",
                            "limit": 20
                        }
                        `,
                },
                {
                    role: 'user',
                    content: `
                        Search query: ${keyword}

                        Convert the search query to this structured parsable JSON format:

                        {
                            query: '', // A search term to be applied against titles.
                            ll: '', // The latitude/longitude around which you wish to retrieve place information. Specified as latitude,longitude (e.g., ll=41.8781,-87.6298). If you do not specify ll, the server will attempt to retrieve the IP address from the request, and geolocate that IP address. 
                            radius: 5000, //Defines the distance (in meters) within which to return place results. Setting a radius biases the results to the indicated area, but may not fully restrict results to that specified area. If not provided, default radius is set to 5000 meters.
                            types: 'place', // The types of results to return; any combination of place, address, search, and/or geo.If no types are specified, all types will be returned.
                            bias: 'geo', // Bias the autocomplete results by a specific type; one of place, address, search, or geo.
                            limit: 20 // default this to 20
                        }
                        `,
                },
            ],
        });

        const rawJson = completion.choices?.[0].message.content as string;
        const requestJson = JSON.parse(rawJson);
        console.log('requestJson', requestJson);

        const queryParams = new URLSearchParams(requestJson);

        const url = `${baseUrl}/v3/places/search?${queryParams.toString()}`;
        const response = await fetch(url, getOptions);
        const data = await response.json();

        return Response.json({ data: data.results });
    } catch (err) {
        console.log('err', err);
        return Response.json({ err });
    }
}
