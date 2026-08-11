import type { RequestHandler } from './$types';
import { privatePaths } from '$data/site';

export const GET: RequestHandler = ({ url }) => {
	const body = [
		'User-agent: *',
		...privatePaths.map((p) => `Disallow: ${p}`),
		'Allow: /',
		'',
		`Sitemap: ${url.origin}/sitemap.xml`
	].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
