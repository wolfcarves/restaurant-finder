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
                    content:
                        'You are an assistant that will convert the input restaurant search query into structured JSON format',
                },
                {
                    role: 'user',
                    content: `
                        Search query: ${keyword}

                        Convert the search query to this structured JSON format:

                        {
                            query: "", // string (required) - Must be at least 3 characters
                            ll: undefined as string | undefined, // e.g. "41.8781,-87.6298"
                            radius: 5000, // number (optional) - in meters, default is 5000
                            types: undefined as string | undefined, // e.g. "place,address"
                            bias: undefined as "place" | "address" | "search" | "geo" | undefined,
                            session_token: undefined as string | undefined, // optional
                            limit: 10,
                        };

                        `,
                },
            ],
        });

        return Response.json({
            completion,
        });
    } catch (err) {
        return Response.json({
            err,
        });
    }
}
