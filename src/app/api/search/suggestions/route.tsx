import { baseUrl, getOptions } from '@/lib/forsquareapi';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const keyword = searchParams.get('keyword');

        if (!keyword) Response.json({ result: [] });

        const url = `${baseUrl}/v3/autocomplete?query=${encodeURIComponent(keyword!)}`;
        const response = await fetch(url, getOptions);
        const json = await response.json();

        return Response.json({
            data: json.results,
        });
    } catch (err) {
        return Response.json({
            err,
        });
    }
}
