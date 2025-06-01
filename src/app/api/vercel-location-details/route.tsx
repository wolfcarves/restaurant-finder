export async function GET(req: Request) {
    const headers = new Headers(req.headers);

    const country = headers.get('x-vercel-ip-country');
    const city = headers.get('x-vercel-ip-city');
    const region = headers.get('x-vercel-ip-country-region');
    const ip = headers.get('x-forwarded-for');

    return Response.json({ country, city, region, ip });
}
