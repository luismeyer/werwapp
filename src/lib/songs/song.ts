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

export const getRandomSong = (songs: Song[], excludedSong: Song | undefined): Song => {
	const playableSongs = songs.length > 1 ? songs.filter((s) => s !== excludedSong) : songs;

	const song = playableSongs[Math.round(Math.random() * (songs.length - 1))];
	return song;
};

const FadeSteps = 0.01;
const FadeInterval = 60;

export const FadeDuration = (1 / FadeSteps) * FadeInterval;

export const fadeSongs = (target: 'day' | 'night', crossFade: CrossFade) => {
	const internal = target === 'night' ? 1 : 0;

	return new Promise((res) => {
		const interval = setInterval(() => {
			const modifier = internal === 1 ? FadeSteps : -FadeSteps;

			crossFade.fade.value = parseFloat((crossFade.fade.value + modifier).toFixed(2));

			if (crossFade.fade.value === internal) {
				clearInterval(interval);
				res(true);
			}
		}, FadeInterval);
	});
};

/**
 * Loads a new random song into the buffer that was not played in the last round.
 * @param songs	Songs to choose a random from.
 * @param excludedSong Song that gets excluded from the searchable songs.
 * @param player Player that will load the song.
 * @returns
 */
export const loadRandomSong = async (
	songs: Song[],
	excludedSong: Song | undefined,
	player: Player
) => {
	const song = getRandomSong(songs, excludedSong);

	const buffer = new Buffer();
	await buffer.load('api/songs?url=' + song.internalUrl);

	player.buffer = buffer;

	return song;
};
