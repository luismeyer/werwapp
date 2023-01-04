import type { RequestEvent } from './$types';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }: RequestEvent) {
	const songUrl = url.searchParams.get('url') ?? '';

	const songData = await fetch(songUrl);

	return songData;
}
