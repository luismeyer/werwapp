import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const { ADMIN_URL, WERWAPP_SECRET } = env;

if (!ADMIN_URL) {
	throw new Error('Missing env var ADMIN_URL');
}

if (!WERWAPP_SECRET) {
	throw new Error('Missing env var WERWAPP_SECRET');
}

export async function GET(request: RequestEvent) {
	const pathname = request.url.searchParams.get('pathname');

	if (!pathname) {
		return new Response('missing pathname', { status: 404 });
	}

	const url = new URL(`api/${pathname}`, ADMIN_URL);
	const response = await fetch(url, {
		headers: { Authorization: `Bearer ${WERWAPP_SECRET}` }
	});

	if (!response.ok) {
		return new Response('not ok', { status: 404 });
	}

	const data = await response.json();

	return new Response(JSON.stringify(data), { headers: { 'content-type': 'application/json' } });
}
