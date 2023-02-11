import type { RequestEvent } from '@sveltejs/kit';
import fs from 'fs';
import { gzipSync } from 'zlib';

export async function GET({ url }: RequestEvent) {
	const songUrl = decodeURIComponent(url.searchParams.get('url') ?? '');
	const noCache = url.searchParams.get('noCache') ?? false;

	const internalSongName = Buffer.from(songUrl, 'ascii').toString('base64url');
	const songPath = './tmp/' + internalSongName + '.gz';

	let buffer: Buffer;

	if (fs.existsSync(songPath) && !noCache) {
		buffer = fs.readFileSync(songPath);
	} else {
		const songData = await fetch(songUrl).then((res) => res.arrayBuffer());
		buffer = gzipSync(songData);

		saveSong(buffer, songPath);
	}

	return new Response(buffer, {
		headers: {
			'cache-control': 'public, max-age=31536000',
			'content-encoding': 'gzip'
		}
	});
}

const saveSong = (buffer: Buffer, songPath: string) => {
	if (!fs.existsSync('./tmp')) {
		fs.mkdirSync('./tmp');
	}

	console.info('Saving mp3 into cache', songPath);

	fs.writeFileSync(songPath, buffer);
};
