import fsq from '@api/fsq-developers';

const apiKey = process.env.FORSQUARE_API_KEY;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get('keyword');

        if (!apiKey) throw new Error('No FORSQUARE_API_KEY found.');

        fsq.auth(apiKey);

        if (!keyword) Response.json({ result: [] });

        const { data: response } = await fsq.autocomplete({ query: keyword ?? '' });
        const result = response.results ?? [];

        return Response.json({
            data: result,
        });
    } catch (err) {
        return Response.json({
            err,
        });
    }
}
