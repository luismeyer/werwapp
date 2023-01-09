import type { RequestEvent } from './$types';
import fs from 'fs';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }: RequestEvent) {
	const songUrl = url.searchParams.get('url') ?? '';
	const internalSongName = Buffer.from(songUrl, 'ascii').toString('base64');
	const songPath = './tmp/' + internalSongName + '.mp3';

	if (fs.existsSync(songPath)) {
		// Serve song from internal cache

		const blob = fs.readFileSync(songPath);
		return new Response(blob);
	} else {
		// Request song and save it.

		const songData = await fetch(songUrl);
		const blob = await songData.blob();
		const buffer = Buffer.from(await blob.arrayBuffer());

		if (!fs.existsSync('./tmp')) {
			fs.mkdirSync('./tmp');
		}

		fs.writeFile(songPath, buffer, (err) => {
			if (err) {
				console.log('Could not save mp3', err);
			}
		});

		return new Response(blob);
	}
}
