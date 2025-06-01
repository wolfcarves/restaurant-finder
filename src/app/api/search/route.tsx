import { baseUrl } from '@/lib/forsquareapi';
import { openai } from '@/lib/openapi';
import { geolocation } from '@vercel/functions';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get('keyword');

        const userDetails = geolocation(request);
        console.log('userDetails', userDetails);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini:free',
            messages: [
                {
                    role: 'system',
                    content: `
                            You are an assistant that converts a place or restaurant search query into a structured raw JSON object.
                            Return only the JSON — no code blocks, no explanation, and no comments.

                            User location info (Only use if BOTH of the following conditions are true):
                            1. The search query does NOT include a location.
                            2. Use the user's available latitude and longitude if provided.  
                            If not available, use the city and country to extract the 'll'.  
                            If neither are available, leave 'll' as an empty string.

                            User Info:
                            {
                                latitude: ${userDetails.latitude ?? 'undefined'},
                                longitude: ${userDetails.longitude ?? 'undefined'},
                                city: ${userDetails.city ?? 'undefined'},
                                country: ${userDetails.country ?? 'undefined'}
                            }

                            Rules:

                            - If the search query includes a specific location (e.g., "in New York", "near Tokyo", "around Paris", "in the United States"):
                            - Extract that location and use it to determine the "ll" (latitude and longitude).

                            - If the location is large or general (e.g., a country like “United States” or “Japan”):
                            - Use the latitude and longitude of its capital city or a major/popular city (e.g., Washington, D.C. for the U.S., Tokyo for Japan).

                            - If the query does not mention a location AND ip is defined:
                            - Leave "ll" as an empty string ("") so the Foursquare API will use IP geolocation.

                            - Only if both query has no location AND ip is missing or undefined:
                            - Use the country and city to determine the "ll".

                            Other rules:

                            - Do not include the location in the "query" field. Only include the main search keyword like "museum", "ramen", or "coffee shop".
                            - Set "bias" to the most suitable of: "place", "address", "search", or "geo".
                            - Correct any typos in the input.
                            - Always return a full JSON object with the following keys:

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
                {
                    role: 'user',
                    content: `Search query: ${keyword}`,
                },
            ],
        });

        const rawJson = completion.choices?.[0].message.content as string;
        const requestJson = JSON.parse(rawJson);

        const queryParams = new URLSearchParams(requestJson);

        console.log('queryParams', queryParams);

        const url = `${baseUrl}/v3/places/search?${queryParams.toString()}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: process.env.FORSQUARE_API_KEY as string,
            },
        } as RequestInit;

        const response = await fetch(url, options);
        const data = await response.json();

        return Response.json({ data: data.results });
    } catch (err) {
        console.log('err', err);
        return Response.json({ err });
    }
}
