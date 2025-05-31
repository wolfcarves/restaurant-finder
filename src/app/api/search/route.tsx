import { baseUrl, getOptions } from '@/lib/forsquareapi';
import { openai } from '@/lib/openapi';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get('keyword');

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini:free',
            messages: [
                {
                    role: 'system',
                    content: `
                        You are an assistant that:
                        
                        Converts the input restaurant search query into a structured JSON object. Respond only with the raw JSON — no code blocks or comments.

                        If the user mentions a specific place (like a city or location), use that to generate the ll (latitude,longitude).

                        If the user does not mention a location, default the ll value to '14.5995,120.9842' (Manila, Philippines).

                        Set the bias value appropriately based on the search — either "place", "address", "search", or "geo" — whichever fits best for the user's intent.

                        Always include the following keys: query, ll, radius, types, bias, and limit.
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

                        Only respond with the raw JSON object, no explanation, no comments.
                        Use all of the mentioned locations from the query, unless the user's current location is provided.
                        `,
                },
            ],
        });

        const rawJson = completion.choices?.[0].message.content as string;
        const requestJson = JSON.parse(rawJson);
        const queryParams = new URLSearchParams(requestJson);

        console.log('rawJson', rawJson);

        const url = `${baseUrl}/v3/places/search?${queryParams.toString()}`;
        const response = await fetch(url, getOptions);
        const data = await response.json();

        return Response.json({ data: data.results });
    } catch (err) {
        console.log('err', err);
        return Response.json({ err });
    }
}
