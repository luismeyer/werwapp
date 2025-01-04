import { Songs } from '../../const/songs';
import type { Song } from '../song';

export interface SongRepository {
	name: string;
	getSong(): Promise<Song>;
}

class SongRepositoryBase {
	private songHistory: Song[] = [];

	private fetchRandomSong = async (type: 'day' | 'night') => {
		const exclude = this.songHistory.map(({ id }) => id);
		const songs = Songs.filter((song) => song.type === type && !exclude?.includes(song.id));

		const song = songs[Math.floor(Math.random() * songs.length)];

		if (!song) {
			throw new Error('No new song');
		}

		return song;
	};

	private pushSongHistory(song: Song) {
		this.songHistory.push(song);

		if (this.songHistory.length > 5) {
			this.songHistory.shift();
		}
	}

	protected async loadSong(type: 'day' | 'night') {
		const song = await this.fetchRandomSong(type);

		this.pushSongHistory(song);

		return song;
	}
}

export class DaySongs extends SongRepositoryBase implements SongRepository {
	public name = 'day';

	public async getSong() {
		return this.loadSong('day');
	}
}

export class NightSongs extends SongRepositoryBase implements SongRepository {
	public name = 'night';

	public getSong() {
		return this.loadSong('night');
	}
}
