import { get } from 'svelte/store';

import { playerStore } from '$lib/stores/player';

import { songData } from './songdata';

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

const getPhaseSongs = (phase: 'day' | 'night') =>
	phase === 'day' ? songData.daySongs : songData.nightSongs;

export const getRandomSong = (phase: 'day' | 'night', excludedSong: Song | undefined): Song => {
	const songs = getPhaseSongs(phase);
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

export const createApiSongUrl = (song: Song) => {
	const searchParams = new URLSearchParams(location.search);
	searchParams.set('url', song.internalUrl);

	return `api/songs?${searchParams.toString()}`;
};

/**
 * Loads a new random song into the buffer that was not played in the last round.
 */
export const loadNextRandomSongForPhase = async (target: 'day' | 'night', excludedSong?: Song) => {
	const { dayPlayer, nightPlayer } = get(playerStore);
	const player = target === 'day' ? dayPlayer : nightPlayer;

	const song = getRandomSong(target, excludedSong);

	await player?.load(createApiSongUrl(song));

	playerStore.update({ nextPhaseSong: song });
};
