import type { Song } from '../song';
import { songData } from '../songdata';

export interface SongRepository {
	getSong(excludeSong?: Song): Song;
}

const getRandomSong = (songs: Song[], excludedSong: Song | undefined): Song => {
	const playableSongs = songs.filter((s) => s !== excludedSong);

	const song = playableSongs[Math.floor(Math.random() * playableSongs.length)];

	if (!song) {
		throw new Error('No new song');
	}

	return song;
};

export class DaySongs implements SongRepository {
	public getSong(excludeSong?: Song) {
		return getRandomSong(songData.daySongs, excludeSong);
	}
}

export class NightSongs implements SongRepository {
	public getSong(excludeSong?: Song) {
		return getRandomSong(songData.nightSongs, excludeSong);
	}
}
