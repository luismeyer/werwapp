import type { Song } from '../song';

export interface SongRepository {
	getSong(excludeSong?: Song): Promise<Song>;
}

const getRandomSong = async (type: 'day' | 'night', excludedSong?: Song) => {
	const params = new URLSearchParams();
	params.set('type', type);

	if (excludedSong) {
		params.set('exclude', String(excludedSong.id));
	}

	const song: Song | undefined = await fetch(`/api/song?${params.toString()}`)
		.then((res) => res.json())
		.catch(() => undefined);

	if (!song) {
		throw new Error('No new song');
	}

	return song;
};

export class DaySongs implements SongRepository {
	public getSong(excludeSong?: Song) {
		return getRandomSong('day', excludeSong);
	}
}

export class NightSongs implements SongRepository {
	public getSong(excludeSong?: Song) {
		return getRandomSong('night', excludeSong);
	}
}
