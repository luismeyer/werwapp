import type { Song } from '../song';

export interface SongRepository {
	name: string;
	getSong(): Promise<Song>;
}

class SongRepositoryBase {
	private songHistory: Song[] = [];

	private fetchRandomSong = async (type: 'day' | 'night') => {
		const params = new URLSearchParams();
		params.set('type', type);

		if (this.songHistory.length) {
			params.set('exclude', this.songHistory.map(({ id }) => id).join(','));
		}

		const song: Song | undefined = await fetch(`/api/song?${params.toString()}`, {
			cache: 'no-store'
		})
			.then((res) => res.json())
			.catch(() => undefined);

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
