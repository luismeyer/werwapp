import { error, type RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET({ url }: RequestEvent) {
	const replaceMap = {
		artist: url.searchParams.get('artist')?.replaceAll(' ', '').toUpperCase() ?? '',
		title: url.searchParams.get('title')?.replaceAll(' ', '').toUpperCase() ?? '',
		state: url.searchParams.get('state')?.replaceAll(' ', '').toUpperCase() ?? ''
	};

	if (!(replaceMap.artist && replaceMap.title && replaceMap.state)) {
		throw error(404, 'artist, title and state have to be provided by serach params');
	}

	const songUrl = env.SECRET_SONG_BASE_PATH?.replaceAll(/{STATE}|{ARTIST}|{TITLE}/g, (matched) => {
		const key = matched.replaceAll(/{|}/g, '').toLocaleLowerCase() as keyof typeof replaceMap;
		return replaceMap[key];
	});

	if (!songUrl) {
		throw error(500, 'Secret_Song_Base_Path is not set!');
	}

	const songResponse = await fetch(songUrl);

	if (songResponse.status !== 200) {
		console.error(`Song could not be fetched using URL: ${songUrl}`, songResponse);
		throw error(500, 'Song could not be fetched!');
	}

	const blob = await songResponse.blob();

	const response = new Response(blob);
	response.headers.append('cache-control', 'public, max-age=31536000');

	return response;
}
