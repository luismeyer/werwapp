import type { RequestEvent } from '@sveltejs/kit';

import { env } from '$env/dynamic/private';

import { connect } from '@planetscale/database';

const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST } = env;
const dbConnection = connect({
	host: DATABASE_HOST,
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
	fetch: (url, init) => {
		if (init) {
			delete init['cache'];
		}

		return fetch(url, init);
	}
});

// we do these checks at runtime so that we can build witht the env vars
const ensureEnvVars = () => {
	if (!DATABASE_USERNAME) {
		throw new Error('Missing DATABASE_USERNAME');
	}

	if (!DATABASE_PASSWORD) {
		throw new Error('Missing DATABASE_PASSWORD');
	}

	if (!DATABASE_HOST) {
		throw new Error('Missing DATABASE_HOST');
	}
};

export async function GET({ url }: RequestEvent) {
	ensureEnvVars();

	const songType = url.searchParams.get('type');
	const excluded = url.searchParams.get('exclude');

	if (!songType) {
		return new Response('Missing songType in request', { status: 404 });
	}

	const excludedIds = excluded?.split(',') ?? [];

	const idQuery = excludedIds?.length ? excludedIds.map(() => ' AND id != ? ').join('') : ' ';

	const result = await dbConnection.execute(
		`SELECT * FROM songs WHERE type = ?${idQuery}ORDER BY RAND() LIMIT 1;`,
		[songType, ...excludedIds]
	);

	const [song] = result.rows;

	if (!song) {
		return new Response('No new song available', { status: 404 });
	}

	const response = new Response(JSON.stringify(song));
	response.headers.append('cache-control', 'public, max-age=31536000');
	response.headers.append('content-type', 'application/json');

	return response;
}
