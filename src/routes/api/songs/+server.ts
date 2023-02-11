import type { RequestEvent } from '@sveltejs/kit';
import fs from 'fs';
import { createGzip } from 'zlib';
import { pipeline, Readable } from 'stream';
import { promisify } from 'util';

export async function GET({ url }: RequestEvent) {
	const songUrl = url.searchParams.get('url') ?? '';
	const internalSongName = Buffer.from(songUrl, 'ascii').toString('base64url');
	const songPath = './tmp/' + internalSongName + '.gz';

	if (fs.existsSync(songPath)) {
		// Serve song from internal cache
		console.log('Serving mp3 from cache');
		const blob = fs.readFileSync(songPath);

		const response = new Response(blob);
		response.headers.append('cache-control', 'public, max-age=31536000');
		response.headers.append('content-encoding', 'gzip');
		return response;
	} else {
		// Request song and save it.
		const songData = await fetch(songUrl);
		const blob = await await songData.blob();

		saveSong(blob, songPath);

		const response = new Response(blob);
		response.headers.append('cache-control', 'public, max-age=31536000');
		return response;
	}
}

const saveSong = async (blob: Blob, songPath: string) => {
	const gzip = createGzip();
	const pipe = promisify(pipeline);
	const buffer = Buffer.from(await blob.arrayBuffer());
	const bufferStream = Readable.from(buffer);

	const destination = fs.createWriteStream(songPath);

	if (!fs.existsSync('./tmp')) {
		fs.mkdirSync('./tmp');
	}

	console.log('Saving mp3 into cache', songPath);

	await pipe(Readable.from(buffer), gzip, destination);
	bufferStream.destroy();
	destination.close();
};
