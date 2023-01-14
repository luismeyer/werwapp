import { playerStore } from '$lib/stores/player';
import { get } from 'svelte/store';

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

	const song = playableSongs[Math.floor(Math.random() * playableSongs.length)];

	if (!song) {
		throw new Error('No new song');
	}

	return song;
};

const FadeSteps = 0.01;
const FadeInterval = 60;

export const FadeDuration = (1 / FadeSteps) * FadeInterval;

export const fadeSongs = (target: 'day' | 'night') => {
	const { crossFade } = get(playerStore);
	const internal = target === 'night' ? 1 : 0;

	if (!crossFade) {
		throw new Error('Fading without crossfade');
	}

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
export const loadNextRandomSong = async (
	songs: Song[],
	target: 'day' | 'night',
	excludedSong?: Song
) => {
	const { dayPlayer, nightPlayer } = get(playerStore);
	const player = target === 'day' ? dayPlayer : nightPlayer;

	const song = getRandomSong(songs, excludedSong);

	await player?.load('api/songs?url=' + song.internalUrl);

	playerStore.update({ nextSong: song });
};
