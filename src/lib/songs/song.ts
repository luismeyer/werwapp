import { type CrossFade, type Player, Buffer } from 'tone';

export type Song = {
	title: string;
	internalUrl: string;
	songPage: string;
	artist: string;
};

export type Songs = {
	daySongs: Song[];
	nightSongs: Song[];
};

export const getRandomSong = (songs: Song[]): Song => {
	const song = songs[Math.round(Math.random() * (songs.length - 1))];
	return song;
};

export const fadeSongs = (target: 'day' | 'night', crossFade: CrossFade) => {
	const internal = target === 'night' ? 1 : 0;

	return new Promise((res) => {
		const interval = setInterval(() => {
			const modifier = internal === 1 ? 0.01 : -0.01;

			crossFade.fade.value = parseFloat((crossFade.fade.value + modifier).toFixed(2));

			if (crossFade.fade.value === internal) {
				clearInterval(interval);
				res(true);
			}
		}, 50);
	});
};

export const loadRandomSong = async (songs: Song[], player: Player) => {
	const song = getRandomSong(songs);

	const buffer = new Buffer();
	await buffer.load('api/songs?url=' + song.internalUrl);

	player.buffer = buffer;

	return song;
};
