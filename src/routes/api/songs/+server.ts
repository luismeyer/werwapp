import type { RequestEvent } from '@sveltejs/kit';
import fs from 'fs';
import { createGzip } from 'zlib';
import { pipeline, Readable, Stream } from 'stream';
import { promisify } from 'util';

export async function GET({ url }: RequestEvent) {
	const songUrl = url.searchParams.get('url') ?? '';
	const internalSongName = Buffer.from(songUrl, 'ascii').toString('base64url');
	const songPath = './tmp/' + internalSongName + '.gz';

	let response: Response;

	if (fs.existsSync(songPath)) {
		// Serve song from internal cache
		console.log('Serving mp3 from cache');
		const blob = fs.readFileSync(songPath);

		response = new Response(blob);
	} else {
		// Request song and save it.
		const songData = await fetch(songUrl);
		const blob = await await songData.blob();
		const buffer = Buffer.from(await blob.arrayBuffer());
		const bufferStream = Readable.from(buffer);

		saveSong(buffer, songPath);

		const responseBuffer = await streamToBuffer(bufferStream.pipe(createGzip()));

		response = new Response(responseBuffer);
	}

	response.headers.append('cache-control', 'public, max-age=31536000');
	response.headers.append('content-encoding', 'gzip');
	return response;
}

const saveSong = async (buffer: Buffer, songPath: string) => {
	const gzip = createGzip();
	const pipe = promisify(pipeline);
	const bufferStream = Readable.from(buffer);

	const destination = fs.createWriteStream(songPath);

	if (!fs.existsSync('./tmp')) {
		fs.mkdirSync('./tmp');
	}

	console.log('Saving mp3 into cache', songPath);

	await pipe(Readable.from(buffer), gzip, destination);
	bufferStream.destroy();
	gzip.close();
	destination.close();
};

const streamToBuffer = (stream: Stream): Promise<Buffer> => {
	const chunks: Buffer[] = [];
	return new Promise((resolve, reject) => {
		stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
		stream.on('error', (err) => reject(err));
		stream.on('end', () => resolve(Buffer.concat(chunks)));
	});
};
