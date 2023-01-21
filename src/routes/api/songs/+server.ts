import type { RequestEvent } from '@sveltejs/kit';
import fs from 'fs';

export async function GET({ url }: RequestEvent) {
	const songUrl = url.searchParams.get('url') ?? '';
	const internalSongName = Buffer.from(songUrl, 'ascii').toString('base64url');
	const songPath = './tmp/' + internalSongName + '.mp3';

	if (fs.existsSync(songPath)) {
		// Serve song from internal cache
		const blob = fs.readFileSync(songPath);

		console.log('Serving mp3 from cache');

		const response = new Response(blob);
		response.headers.append('cache-control', 'public, max-age=31536000');
		return response;
	} else {
		// Request song and save it.

		const songData = await fetch(songUrl);
		const blob = await songData.blob();
		const buffer = Buffer.from(await blob.arrayBuffer());

		if (!fs.existsSync('./tmp')) {
			fs.mkdirSync('./tmp');
		}

		console.log('Saving mp3 into cache', songPath);

		fs.writeFile(songPath, buffer, (err) => {
			if (err) {
				console.log('Could not save mp3', err);
			}
		});

		const response = new Response(blob);
		response.headers.append('cache-control', 'public, max-age=31536000');
		return response;
	}
}
